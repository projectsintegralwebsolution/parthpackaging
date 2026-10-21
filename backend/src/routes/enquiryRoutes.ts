import { Router } from "express";
import {
  createEnquiry,
  getHealth,
} from "../controllers/enquiryController.js";

const router = Router();

/**
 * Primary enquiry submission endpoint
 * POST /api/enquiries (and /enquiries)
 * (No database, no rate limiting)
 */
router.post("/api/enquiries", createEnquiry);
router.post("/enquiries", createEnquiry);

/**
 * Backward compatibility alias
 * POST /api/enquiry (and /enquiry)
 */
router.post("/api/enquiry", createEnquiry);
router.post("/enquiry", createEnquiry);

/**
 * Health check endpoint
 * GET /api/health (and /health)
 */
router.get("/api/health", getHealth);
router.get("/health", getHealth);

export default router;
