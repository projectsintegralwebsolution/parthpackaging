import nodemailer, { Transporter } from "nodemailer";
import { config, isSmtpConfigured } from "../config/env.js";
import {
  buildCustomerConfirmationEmail,
  buildOwnerNotificationEmail,
  buildDeveloperNotificationEmail,
  EmailEnquiryContext,
} from "../templates/emailTemplates.js";
import { EnquiryRecord } from "../repositories/enquiryRepository.js";

export interface SingleEmailResult {
  success: boolean;
  messageId?: string;
  error?: string | null;
  simulated?: boolean;
}

export interface ThreeWayEmailResult {
  customer: SingleEmailResult;
  owner: SingleEmailResult;
  developer: SingleEmailResult;
}

class EmailService {
  private transporter: Transporter | null = null;

  constructor() {
    this.initTransporter();
  }

  private initTransporter(): void {
    if (isSmtpConfigured()) {
      try {
        this.transporter = nodemailer.createTransport({
          host: config.smtp.host,
          port: config.smtp.port,
          secure: config.smtp.secure,
          auth: {
            user: config.smtp.user,
            pass: config.smtp.pass,
          },
          tls: {
            rejectUnauthorized: config.nodeEnv === "production",
          },
          connectionTimeout: 15000,
          greetingTimeout: 10000,
          socketTimeout: 20000,
        });
      } catch (err: unknown) {
        console.error("Failed to initialize SMTP transporter:", err instanceof Error ? err.message : err);
        this.transporter = null;
      }
    } else {
      this.transporter = null;
    }
  }

  /**
   * Verify SMTP connection with the provider
   */
  public async verifyConnection(): Promise<{ ok: boolean; message: string }> {
    if (!this.transporter) {
      return {
        ok: false,
        message: "SMTP is not configured with live credentials in .env",
      };
    }
    try {
      await this.transporter.verify();
      return { ok: true, message: "SMTP connection verified successfully" };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return { ok: false, message: `SMTP verification failed: ${message}` };
    }
  }

  /**
   * Convert an EnquiryRecord to the template context
   */
  private recordToContext(record: EnquiryRecord): EmailEnquiryContext {
    return {
      referenceId: record.reference_id,
      fullName: record.customer_name,
      companyName: record.company_name,
      email: record.customer_email,
      countryCode: record.country_code,
      phone: record.customer_phone,
      inquiryMode: record.inquiry_mode,
      productCategory: record.product_category,
      palletOrVariant: record.pallet_or_variant,
      quantity: record.quantity,
      deliveryLocation: record.delivery_location,
      specifications: record.specifications,
      sourcePageUrl: record.source_page_url,
      formType: record.form_type,
      submissionTimestamp: record.submission_timestamp,
    };
  }

  /**
   * Send Email 1: Customer Confirmation Email
   */
  public async sendCustomerConfirmation(
    record: EnquiryRecord
  ): Promise<SingleEmailResult> {
    const ctx = this.recordToContext(record);
    const { subject, html, text } = buildCustomerConfirmationEmail(ctx);

    if (!isSmtpConfigured() || !this.transporter) {
      console.log(
        `[Simulated Email 1] Customer confirmation to: ${record.customer_email} (Ref: ${record.reference_id})`
      );
      return {
        success: true,
        simulated: true,
        messageId: `simulated-cust-${Date.now()}`,
      };
    }

    try {
      const info = await this.transporter.sendMail({
        from: config.smtp.from,
        to: record.customer_email,
        subject,
        html,
        text,
      });

      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Unknown SMTP error occurred";
      console.error(
        `[Email 1 Error] Failed to send customer confirmation to ${record.customer_email}:`,
        errorMsg
      );
      return {
        success: false,
        error: errorMsg,
      };
    }
  }

  /**
   * Send Email 2: Parth Packaging Owner Notification Email
   */
  public async sendOwnerNotification(
    record: EnquiryRecord
  ): Promise<SingleEmailResult> {
    const ctx = this.recordToContext(record);
    const { subject, html, text } = buildOwnerNotificationEmail(ctx);
    const recipient = config.recipients.parthPackagingEmail;

    if (!isSmtpConfigured() || !this.transporter) {
      console.log(
        `[Simulated Email 2] Owner notification to: ${recipient} (Reply-To: ${record.customer_email})`
      );
      return {
        success: true,
        simulated: true,
        messageId: `simulated-owner-${Date.now()}`,
      };
    }

    try {
      const info = await this.transporter.sendMail({
        from: config.smtp.from,
        to: recipient,
        replyTo: record.customer_email,
        subject,
        html,
        text,
      });

      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Unknown SMTP error occurred";
      console.error(
        `[Email 2 Error] Failed to send owner notification to ${recipient}:`,
        errorMsg
      );
      return {
        success: false,
        error: errorMsg,
      };
    }
  }

  /**
   * Send Email 3: Integral Web Solution Notification Email
   */
  public async sendDeveloperNotification(
    record: EnquiryRecord
  ): Promise<SingleEmailResult> {
    const ctx = this.recordToContext(record);
    const { subject, html, text } = buildDeveloperNotificationEmail(ctx);
    const recipient = config.recipients.integralWebSolutionEmail;

    if (!isSmtpConfigured() || !this.transporter) {
      console.log(
        `[Simulated Email 3] Integral Web Solution notification to: ${recipient} (Reply-To: ${record.customer_email})`
      );
      return {
        success: true,
        simulated: true,
        messageId: `simulated-dev-${Date.now()}`,
      };
    }

    try {
      const info = await this.transporter.sendMail({
        from: config.smtp.from,
        to: recipient,
        replyTo: record.customer_email,
        subject,
        html,
        text,
      });

      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Unknown SMTP error occurred";
      console.error(
        `[Email 3 Error] Failed to send Integral Web Solution notification to ${recipient}:`,
        errorMsg
      );
      return {
        success: false,
        error: errorMsg,
      };
    }
  }

  /**
   * Send all three notifications in parallel with independent tracking
   */
  public async sendThreeWayNotifications(
    record: EnquiryRecord
  ): Promise<ThreeWayEmailResult> {
    const [custResult, ownerResult, devResult] = await Promise.allSettled([
      this.sendCustomerConfirmation(record),
      this.sendOwnerNotification(record),
      this.sendDeveloperNotification(record),
    ]);

    return {
      customer:
        custResult.status === "fulfilled"
          ? custResult.value
          : {
              success: false,
              error: custResult.reason?.message || "Execution failed",
            },
      owner:
        ownerResult.status === "fulfilled"
          ? ownerResult.value
          : {
              success: false,
              error: ownerResult.reason?.message || "Execution failed",
            },
      developer:
        devResult.status === "fulfilled"
          ? devResult.value
          : {
              success: false,
              error: devResult.reason?.message || "Execution failed",
            },
    };
  }

  /**
   * Safe retry: sends only the specific notification(s) that previously failed
   */
  public async retryFailedEmails(
    record: EnquiryRecord
  ): Promise<Partial<ThreeWayEmailResult>> {
    const results: Partial<ThreeWayEmailResult> = {};

    if (record.email_customer_status !== "sent") {
      results.customer = await this.sendCustomerConfirmation(record);
    }
    if (record.email_owner_status !== "sent") {
      results.owner = await this.sendOwnerNotification(record);
    }
    if (record.email_developer_status !== "sent") {
      results.developer = await this.sendDeveloperNotification(record);
    }

    return results;
  }
}

export const emailService = new EmailService();
