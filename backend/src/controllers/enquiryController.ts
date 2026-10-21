import { Request, Response, NextFunction } from "express";
import { validateEnquiryRequest } from "../utils/validation.js";
import { enquiryService } from "../services/enquiryService.js";
import { enquiryRepository } from "../repositories/enquiryRepository.js";
import { isSmtpConfigured } from "../config/env.js";

export class EnquiryController {
  /**
   * Handle incoming enquiry submission from any website form
   * POST /api/enquiries or POST /api/enquiry
   */
  public static async createEnquiry(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const validation = validateEnquiryRequest(req.body);

      // Handle spam bot detection
      if (validation.isSpamBot) {
        // Silently deflect bot submissions without throwing or sending emails
        console.warn(
          `[Bot Protection] Spam submission deflected from IP: ${req.ip}`
        );
        res.status(200).json({
          success: true,
          ok: true,
          message: "Your enquiry has been received.",
          referenceId: "PP-RECEIVED",
        });
        return;
      }

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

      // If sourcePageUrl was not set by the client, deduce from headers/referrer
      if (!validation.data.sourcePageUrl && req.get("referer")) {
        validation.data.sourcePageUrl = req.get("referer") || "";
      }

      const result = await enquiryService.submitEnquiry(validation.data);

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Health and diagnostic status endpoint
   * GET /api/health
   */
  public static async getHealth(
    _req: Request,
    res: Response
  ): Promise<void> {
    try {
      const totalEnquiries = enquiryRepository.countTotal();
      const smtpStatus = isSmtpConfigured() ? "configured" : "unconfigured_local_logging";

      res.status(200).json({
        success: true,
        ok: true,
        service: "Parth Packaging Backend API",
        status: "healthy",
        timestamp: new Date().toISOString(),
        database: {
          driver: "node:sqlite",
          status: "connected",
          totalEnquiriesLogged: totalEnquiries,
        },
        smtp: {
          status: smtpStatus,
        },
      });
    } catch {
      res.status(500).json({
        success: false,
        ok: false,
        status: "degraded",
        message: "Health check encountered an internal database issue.",
      });
    }
  }

  /**
   * Internal maintenance trigger to retry failed or pending emails
   * POST /api/enquiries/retry
   */
  public static async retryPendingEmails(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await enquiryService.processPendingRetries();
      res.status(200).json({
        success: true,
        ok: true,
        message: `Retry cycle completed. Processed: ${result.processed}, Newly resolved: ${result.resolved}.`,
        result,
      });
    } catch (err) {
      next(err);
    }
  }
}
