import dotenv from "dotenv";
import path from "path";

// Load .env file from backend directory or fallback to root
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

export interface AppConfig {
  port: number;
  nodeEnv: "development" | "production" | "test";
  frontendUrl: string;
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
    from: string;
  };
  recipients: {
    parthPackagingEmail: string;
    integralWebSolutionEmail: string;
  };
}

// Validate and parse environment variables
const port = parseInt(process.env.PORT || "5000", 10);
const nodeEnv = (process.env.NODE_ENV || "production") as
  | "development"
  | "production"
  | "test";

const frontendUrl =
  process.env.FRONTEND_URL || "https://parthpackaging.com";

const smtpHost = process.env.SMTP_HOST || "";
const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
const smtpSecure =
  process.env.SMTP_SECURE === "true" || smtpPort === 465;
const smtpUser = process.env.SMTP_USER || "";
const smtpPass = process.env.SMTP_PASS || "";
const smtpFrom =
  process.env.SMTP_FROM ||
  (smtpUser ? `"Parth Packaging" <${smtpUser}>` : '"Parth Packaging" <enquiries@parthpackaging.com>');

// Email recipients
const parthPackagingEmail =
  process.env.PARTH_PACKAGING_EMAIL || "info@parthpackaging.com";

// Mandatory Integral Web Solution recipient: princekumarjha80@gmail.com
const integralWebSolutionEmail =
  process.env.INTEGRAL_WEB_SOLUTION_EMAIL || "princekumarjha80@gmail.com";

export const config: AppConfig = {
  port,
  nodeEnv,
  frontendUrl,
  smtp: {
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    user: smtpUser,
    pass: smtpPass,
    from: smtpFrom,
  },
  recipients: {
    parthPackagingEmail,
    integralWebSolutionEmail,
  },
};

/**
 * Checks whether live SMTP credentials are fully provided
 */
export function isSmtpConfigured(): boolean {
  return Boolean(
    config.smtp.host &&
    config.smtp.user &&
    config.smtp.pass &&
    config.smtp.host !== "YOUR_SMTP_HOST" &&
    config.smtp.user !== "YOUR_SMTP_USERNAME"
  );
}

/**
 * Safe startup environment summary without revealing passwords or keys
 */
export function validateAndLogConfig(): void {
  console.log("--------------------------------------------------");
  console.log("Parth Packaging Backend Service — Initializing");
  console.log("--------------------------------------------------");
  console.log(`• Environment: ${config.nodeEnv}`);
  console.log(`• HTTP Port: ${config.port}`);
  console.log(`• Frontend Allowed Origin: ${config.frontendUrl}`);
  console.log(`• Owner Notification Email: ${config.recipients.parthPackagingEmail}`);
  console.log(`• Web Partner Notification Email: ${config.recipients.integralWebSolutionEmail}`);
  console.log(`• Database: None (stateless direct-dispatch per specification)`);
  console.log(`• Rate Limiting: None (unrestricted submission capability per specification)`);

  if (isSmtpConfigured()) {
    console.log(
      `✅ SMTP Relay: Configured via ${config.smtp.host}:${config.smtp.port} (Sender: ${config.smtp.from})`
    );
  } else {
    console.log(
      "⚠️  SMTP Relay: NOT YET CONFIGURED with live credentials."
    );
    console.log(
      "   Enquiries will simulate three-way dispatch and log details locally."
    );
    console.log(
      "   Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env to activate live email delivery."
    );
  }
  console.log("--------------------------------------------------");
}

export const logEnvironmentSummary = validateAndLogConfig;
