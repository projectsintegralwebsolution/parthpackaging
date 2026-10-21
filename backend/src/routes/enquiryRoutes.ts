import { Router } from "express";
import { EnquiryController } from "../controllers/enquiryController.js";
import { enquiryRateLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// Primary enquiry endpoint with rate limiting
router.post(
  "/api/enquiries",
  enquiryRateLimiter,
  EnquiryController.createEnquiry
);

// Backward-compatible alias for existing frontend calls
router.post(
  "/api/enquiry",
  enquiryRateLimiter,
  EnquiryController.createEnquiry
);

// Health check endpoint
router.get("/api/health", EnquiryController.getHealth);

// Internal retry trigger
router.post("/api/enquiries/retry", EnquiryController.retryPendingEmails);

export default router;
