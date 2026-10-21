import { Request, Response, NextFunction } from "express";
import { validateEnquiryRequest } from "../utils/validation.js";
import { enquiryService } from "../services/enquiryService.js";
import { isSmtpConfigured } from "../config/env.js";

/**
 * Handle POST /api/enquiries (and POST /api/enquiry)
 * Processes customer enquiry and initiates 3-way email dispatch
 * (No database storage, no rate limiting)
 */
export async function createEnquiry(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // 1. Server-side validation
    const validation = validateEnquiryRequest(req.body);

    // 2. Honeypot check: silently deflect automated spam bots
    if (validation.isSpamBot) {
      console.warn(
        `[Enquiry Controller] Honeypot triggered from IP: ${req.ip} — silently discarding bot submission`
      );
      res.status(200).json({
        success: true,
        ok: true,
        message: "Your enquiry has been received.",
        referenceId: "PP-RECEIVED",
      });
      return;
    }

    // 3. Return structured validation errors
    if (!validation.isValid || !validation.data) {
      res.status(400).json({
        success: false,
        ok: false,
        message:
          "Please check your submitted details and correct the highlighted fields.",
        errors: validation.errors,
      });
      return;
    }

    // 4. Process enquiry and dispatch 3-way emails
    const result = await enquiryService.submitEnquiry(validation.data);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(502).json(result);
    }
  } catch (err: unknown) {
    next(err);
  }
}

/**
 * Handle GET /api/health
 * Public health check and service readiness endpoint
 */
export function getHealth(_req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    ok: true,
    service: "Parth Packaging Backend API",
    status: "healthy",
    timestamp: new Date().toISOString(),
    smtp: {
      status: isSmtpConfigured() ? "configured" : "unconfigured_simulated",
    },
  });
}
