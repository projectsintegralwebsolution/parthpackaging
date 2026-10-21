import rateLimit from "express-rate-limit";
import { config } from "../config/env.js";

/**
 * Rate limiter middleware for public enquiry endpoints.
 * Prevents automated flooding and denial-of-service attempts.
 */
export const enquiryRateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs, // default: 15 minutes
  max: config.rateLimit.max, // default: 10 enquiries per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    ok: false,
    message:
      "Too many enquiry requests from this IP address. Please wait a few minutes before trying again or contact us directly via phone or WhatsApp at +91-9823370522.",
  },
  handler: (_req, res, _next, options) => {
    res.status(429).json(options.message);
  },
});
