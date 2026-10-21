import nodemailer, { Transporter } from "nodemailer";
import { config, isSmtpConfigured } from "../config/env.js";
import {
  buildCustomerConfirmationEmail,
  buildOwnerNotificationEmail,
  buildDeveloperNotificationEmail,
  EmailEnquiryContext,
} from "../templates/emailTemplates.js";

export interface SingleEmailResult {
  success: boolean;
  recipient: string;
  messageId?: string;
  error?: string | null;
  simulated?: boolean;
}

export interface ThreeWayEmailResult {
  allSucceeded: boolean;
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
   * Send Email 1: Customer Confirmation Email
   */
  public async sendCustomerConfirmation(
    ctx: EmailEnquiryContext
  ): Promise<SingleEmailResult> {
    const { subject, html, text } = buildCustomerConfirmationEmail(ctx);
    const recipient = ctx.email;

    if (!isSmtpConfigured() || !this.transporter) {
      console.log(
        `[Email 1: Customer Simulated] Recipient: ${recipient} | Ref: ${ctx.referenceId}`
      );
      return {
        success: true,
        recipient,
        simulated: true,
        messageId: `simulated-cust-${Date.now()}`,
      };
    }

    try {
      const info = await this.transporter.sendMail({
        from: config.smtp.from,
        to: recipient,
        subject,
        html,
        text,
      });

      console.log(
        `[Email 1: Customer Sent] Recipient: ${recipient} | Message ID: ${info.messageId}`
      );
      return {
        success: true,
        recipient,
        messageId: info.messageId,
      };
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Unknown SMTP error occurred";
      console.error(
        `[Email 1 Error] Failed to send customer confirmation to ${recipient}:`,
        errorMsg
      );
      return {
        success: false,
        recipient,
        error: errorMsg,
      };
    }
  }

  /**
   * Send Email 2: Parth Packaging Owner Notification Email
   */
  public async sendOwnerNotification(
    ctx: EmailEnquiryContext
  ): Promise<SingleEmailResult> {
    const { subject, html, text } = buildOwnerNotificationEmail(ctx);
    const recipient = config.recipients.parthPackagingEmail;

    if (!isSmtpConfigured() || !this.transporter) {
      console.log(
        `[Email 2: Owner Simulated] Recipient: ${recipient} | Reply-To: ${ctx.email} | Ref: ${ctx.referenceId}`
      );
      return {
        success: true,
        recipient,
        simulated: true,
        messageId: `simulated-owner-${Date.now()}`,
      };
    }

    try {
      const info = await this.transporter.sendMail({
        from: config.smtp.from,
        to: recipient,
        replyTo: ctx.email,
        subject,
        html,
        text,
      });

      console.log(
        `[Email 2: Owner Sent] Recipient: ${recipient} | Message ID: ${info.messageId}`
      );
      return {
        success: true,
        recipient,
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
        recipient,
        error: errorMsg,
      };
    }
  }

  /**
   * Send Email 3: Integral Web Solution Notification Email
   * MANDATORY: Uses princekumarjha80@gmail.com
   */
  public async sendDeveloperNotification(
    ctx: EmailEnquiryContext
  ): Promise<SingleEmailResult> {
    const { subject, html, text } = buildDeveloperNotificationEmail(ctx);
    const recipient = config.recipients.integralWebSolutionEmail;

    if (!isSmtpConfigured() || !this.transporter) {
      console.log(
        `[Email 3: Web Partner Simulated] Recipient: ${recipient} | Reply-To: ${ctx.email} | Ref: ${ctx.referenceId}`
      );
      return {
        success: true,
        recipient,
        simulated: true,
        messageId: `simulated-partner-${Date.now()}`,
      };
    }

    try {
      const info = await this.transporter.sendMail({
        from: config.smtp.from,
        to: recipient,
        replyTo: ctx.email,
        subject,
        html,
        text,
      });

      console.log(
        `[Email 3: Web Partner Sent] Recipient: ${recipient} | Message ID: ${info.messageId}`
      );
      return {
        success: true,
        recipient,
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
        recipient,
        error: errorMsg,
      };
    }
  }

  /**
   * Send all three notifications concurrently via Promise.allSettled()
   * A failure for one recipient does NOT prevent attempts to send the other two.
   */
  public async sendThreeWayNotifications(
    ctx: EmailEnquiryContext
  ): Promise<ThreeWayEmailResult> {
    const [custResult, ownerResult, devResult] = await Promise.allSettled([
      this.sendCustomerConfirmation(ctx),
      this.sendOwnerNotification(ctx),
      this.sendDeveloperNotification(ctx),
    ]);

    const customer: SingleEmailResult =
      custResult.status === "fulfilled"
        ? custResult.value
        : {
            success: false,
            recipient: ctx.email,
            error: custResult.reason?.message || "Customer email dispatch failed",
          };

    const owner: SingleEmailResult =
      ownerResult.status === "fulfilled"
        ? ownerResult.value
        : {
            success: false,
            recipient: config.recipients.parthPackagingEmail,
            error: ownerResult.reason?.message || "Owner email dispatch failed",
          };

    const developer: SingleEmailResult =
      devResult.status === "fulfilled"
        ? devResult.value
        : {
            success: false,
            recipient: config.recipients.integralWebSolutionEmail,
            error: devResult.reason?.message || "Web Partner email dispatch failed",
          };

    const allSucceeded =
      customer.success && owner.success && developer.success;

    return {
      allSucceeded,
      customer,
      owner,
      developer,
    };
  }
}

export const emailService = new EmailService();
