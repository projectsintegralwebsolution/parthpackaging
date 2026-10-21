import { emailService, ThreeWayEmailResult } from "./emailService.js";
import { ValidatedEnquiryData } from "../utils/validation.js";
import { generateReferenceId } from "../utils/referenceId.js";
import { EmailEnquiryContext } from "../templates/emailTemplates.js";

export interface EnquirySubmissionResult {
  success: boolean;
  ok: boolean;
  message: string;
  referenceId: string;
  data?: {
    referenceId: string;
    timestamp: string;
    emailDelivery: {
      customer: boolean;
      owner: boolean;
      developer: boolean;
      simulated?: boolean;
    };
    record?: {
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
   * Process a customer enquiry and dispatch three-way email notifications
   * (Stateless: NO database storage or persistent queue per strict requirement)
   */
  public async submitEnquiry(
    data: ValidatedEnquiryData
  ): Promise<EnquirySubmissionResult> {
    const referenceId = generateReferenceId();
    const submissionTimestamp = new Date().toISOString();

    const emailContext: EmailEnquiryContext = {
      referenceId,
      fullName: data.fullName,
      companyName: data.companyName,
      email: data.email,
      countryCode: data.countryCode,
      phone: data.phone,
      inquiryMode: data.inquiryMode,
      productCategory: data.productCategory,
      palletOrVariant: data.palletOrVariant,
      quantity: data.quantity,
      deliveryLocation: data.deliveryLocation,
      specifications: data.specifications,
      sourcePageUrl: data.sourcePageUrl,
      formType: data.formType,
      submissionTimestamp,
    };

    console.log(
      `[Enquiry Service] Initiating 3-way email dispatch for Ref: ${referenceId} (Customer: ${data.fullName}, Product: ${data.productCategory})`
    );

    // Trigger three-way notifications in parallel with independent tracking
    const emailResults: ThreeWayEmailResult =
      await emailService.sendThreeWayNotifications(emailContext);

    const isSimulated = Boolean(
      emailResults.customer.simulated ||
      emailResults.owner.simulated ||
      emailResults.developer.simulated
    );

    // Only return full success if all three email delivery operations succeeded
    if (emailResults.allSucceeded) {
      console.log(
        `[Enquiry Service] ✅ All 3 email notifications succeeded for Ref: ${referenceId}`
      );
      return {
        success: true,
        ok: true,
        message: "Your enquiry has been submitted successfully.",
        referenceId,
        data: {
          referenceId,
          timestamp: submissionTimestamp,
          emailDelivery: {
            customer: true,
            owner: true,
            developer: true,
            simulated: isSimulated,
          },
          record: {
            fullName: data.fullName,
            companyName: data.companyName,
            email: data.email,
            phone: `${data.countryCode} ${data.phone}`,
            productCategory: data.productCategory,
            inquiryMode: data.inquiryMode,
            quantity: data.quantity,
          },
        },
      };
    }

    // If one or more emails failed, log specific failures on server and return failure response
    console.error(
      `[Enquiry Service] ❌ Partial or full email failure for Ref: ${referenceId}:`,
      {
        customer: emailResults.customer.success ? "OK" : emailResults.customer.error,
        owner: emailResults.owner.success ? "OK" : emailResults.owner.error,
        developer: emailResults.developer.success ? "OK" : emailResults.developer.error,
      }
    );

    return {
      success: false,
      ok: false,
      message:
        "We could not complete sending all notifications for your enquiry at this time. Please try submitting again or call us directly.",
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
      },
    };
  }
}

export const enquiryService = new EnquiryService();
