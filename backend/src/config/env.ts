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
  database: {
    url: string;
  };
  rateLimit: {
    max: number;
    windowMs: number;
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

// CRITICAL: Must be princekumarjha80@gmail.com as instructed
const integralWebSolutionEmail =
  process.env.INTEGRAL_WEB_SOLUTION_EMAIL || "princekumarjha80@gmail.com";

const databaseUrl =
  process.env.DATABASE_URL || "sqlite:./data/enquiries.db";

const rateLimitMax = parseInt(process.env.RATE_LIMIT_MAX || "10", 10);
const rateLimitWindowMs = parseInt(
  process.env.RATE_LIMIT_WINDOW_MS || "900000",
  10
); // 15 mins default

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
  database: {
    url: databaseUrl,
  },
  rateLimit: {
    max: rateLimitMax,
    windowMs: rateLimitWindowMs,
  },
};

/**
 * Check if real SMTP credentials are fully provided
 */
export function isSmtpConfigured(): boolean {
  return Boolean(
    config.smtp.host &&
      config.smtp.user &&
      config.smtp.pass &&
      !config.smtp.host.includes("your-email-provider") &&
      !config.smtp.pass.includes("YOUR_SECURE")
  );
}

/**
 * Validate configuration and log clean startup diagnostics without leaking secrets
 */
export function validateAndLogConfig(): void {
  console.log("--------------------------------------------------");
  console.log("Parth Packaging Backend Service — Initializing");
  console.log("--------------------------------------------------");
  console.log(`• Environment: ${config.nodeEnv}`);
  console.log(`• HTTP Port: ${config.port}`);
  console.log(`• Frontend Allowed Origin: ${config.frontendUrl}`);
  console.log(`• Database Storage: ${config.database.url}`);
  console.log(
    `• Owner Notification Email: ${config.recipients.parthPackagingEmail}`
  );
  console.log(
    `• Web Partner Notification Email: ${config.recipients.integralWebSolutionEmail}`
  );

  if (isSmtpConfigured()) {
    console.log(
      `• SMTP Relay: ACTIVE (${config.smtp.host}:${config.smtp.port}, secure=${config.smtp.secure})`
    );
    console.log(`• Sender (From): ${config.smtp.from}`);
  } else {
    console.warn(
      "⚠️  SMTP Relay: NOT YET CONFIGURED with live credentials."
    );
    console.warn(
      "   Enquiries will be safely stored in the persistent database and logged."
    );
    console.warn(
      "   Configure SMTP_HOST, SMTP_USER and SMTP_PASS in .env to activate live dispatch."
    );
  }
  console.log("--------------------------------------------------");
}
