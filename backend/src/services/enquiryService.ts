import {
  enquiryRepository,
  EnquiryRecord,
} from "../repositories/enquiryRepository.js";
import { emailService, ThreeWayEmailResult } from "./emailService.js";
import { ValidatedEnquiryData } from "../utils/validation.js";
import { generateRecordId, generateReferenceId } from "../utils/referenceId.js";

export interface EnquirySubmissionResult {
  success: boolean;
  ok: boolean;
  message: string;
  referenceId: string;
  data: {
    referenceId: string;
    timestamp: string;
    emailDelivery: {
      customer: boolean;
      owner: boolean;
      developer: boolean;
      simulated: boolean;
    };
    record: {
      fullName: string;
      companyName: string;
      email: string;
      phone: string;
      productCategory: string;
      inquiryMode: string;
      quantity?: string;
    };
  };
}

class EnquiryService {
  /**
   * Process and store a customer enquiry, then trigger three-way notifications
   */
  public async submitEnquiry(
    data: ValidatedEnquiryData
  ): Promise<EnquirySubmissionResult> {
    const id = generateRecordId();
    const referenceId = generateReferenceId();
    const submissionTimestamp = new Date().toISOString();

    // STEP 1: Persist the enquiry in the database BEFORE attempting email dispatch
    const savedRecord: EnquiryRecord = enquiryRepository.create({
      id,
      reference_id: referenceId,
      customer_name: data.fullName,
      customer_email: data.email,
      customer_phone: data.phone,
      country_code: data.countryCode,
      company_name: data.companyName,
      inquiry_mode: data.inquiryMode,
      product_category: data.productCategory,
      pallet_or_variant: data.palletOrVariant,
      quantity: data.quantity,
      delivery_location: data.deliveryLocation,
      specifications: data.specifications,
      privacy_consent: data.privacyConsent ? 1 : 0,
      source_page_url: data.sourcePageUrl,
      form_type: data.formType,
      submission_timestamp: submissionTimestamp,
    });

    console.log(
      `[Enquiry Service] Enquiry persisted to database: ${referenceId} (${data.fullName}, ${data.productCategory})`
    );

    // STEP 2: Trigger three-way notifications in parallel with independent tracking
    let emailResults: ThreeWayEmailResult = {
      customer: { success: false },
      owner: { success: false },
      developer: { success: false },
    };

    try {
      emailResults = await emailService.sendThreeWayNotifications(savedRecord);
    } catch (err: unknown) {
      console.error(
        `[Enquiry Service] Unexpected error in three-way notification trigger for ${referenceId}:`,
        err
      );
    }

    // STEP 3: Update the database with independent email delivery outcomes
    try {
      enquiryRepository.updateEmailStatus(referenceId, {
        customer: {
          status: emailResults.customer.success ? "sent" : "failed",
          error: emailResults.customer.error,
        },
        owner: {
          status: emailResults.owner.success ? "sent" : "failed",
          error: emailResults.owner.error,
        },
        developer: {
          status: emailResults.developer.success ? "sent" : "failed",
          error: emailResults.developer.error,
        },
      });
    } catch (dbErr: unknown) {
      console.error(
        `[Enquiry Service] Failed to update email delivery status in DB for ${referenceId}:`,
        dbErr
      );
    }

    const allSuccessful =
      emailResults.customer.success &&
      emailResults.owner.success &&
      emailResults.developer.success;

    const isSimulated = Boolean(
      emailResults.customer.simulated ||
        emailResults.owner.simulated ||
        emailResults.developer.simulated
    );

    const message = isSimulated
      ? "Your enquiry has been successfully validated and recorded. Our team will review your requirements."
      : allSuccessful
      ? "Your enquiry has been submitted successfully. A confirmation email has been sent to your address."
      : "Your enquiry has been securely received and recorded. Our team will review your requirements shortly.";

    return {
      success: true,
      ok: true,
      message,
      referenceId,
      data: {
        referenceId,
        timestamp: submissionTimestamp,
        emailDelivery: {
          customer: emailResults.customer.success,
          owner: emailResults.owner.success,
          developer: emailResults.developer.success,
          simulated: isSimulated,
        },
        record: {
          fullName: data.fullName,
          companyName: data.companyName,
          email: data.email,
          phone: `${data.countryCode} ${data.phone}`,
          productCategory: data.productCategory,
          inquiryMode: data.inquiryMode,
          quantity: data.quantity || undefined,
        },
      },
    };
  }

  /**
   * Safe retry routine for transient email failures without duplicate sends
   */
  public async processPendingRetries(): Promise<{
    processed: number;
    resolved: number;
  }> {
    const pendingEnquiries = enquiryRepository.getPendingRetries(5);
    let resolvedCount = 0;

    for (const record of pendingEnquiries) {
      try {
        enquiryRepository.incrementRetryCount(record.reference_id);
        const retryResults = await emailService.retryFailedEmails(record);

        const statusUpdates: Parameters<
          typeof enquiryRepository.updateEmailStatus
        >[1] = {};

        if (retryResults.customer) {
          statusUpdates.customer = {
            status: retryResults.customer.success ? "sent" : "failed",
            error: retryResults.customer.error,
          };
        }
        if (retryResults.owner) {
          statusUpdates.owner = {
            status: retryResults.owner.success ? "sent" : "failed",
            error: retryResults.owner.error,
          };
        }
        if (retryResults.developer) {
          statusUpdates.developer = {
            status: retryResults.developer.success ? "sent" : "failed",
            error: retryResults.developer.error,
          };
        }

        enquiryRepository.updateEmailStatus(
          record.reference_id,
          statusUpdates
        );

        const updated = enquiryRepository.getByReferenceId(
          record.reference_id
        );
        if (
          updated &&
          updated.email_customer_status === "sent" &&
          updated.email_owner_status === "sent" &&
          updated.email_developer_status === "sent"
        ) {
          resolvedCount++;
        }
      } catch (err: unknown) {
        console.error(
          `[Enquiry Service] Error during retry for ${record.reference_id}:`,
          err
        );
      }
    }

    return {
      processed: pendingEnquiries.length,
      resolved: resolvedCount,
    };
  }
}

export const enquiryService = new EnquiryService();
