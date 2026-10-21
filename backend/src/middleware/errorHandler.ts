import { Request, Response, NextFunction } from "express";
import { config } from "../config/env.js";

/**
 * 404 handler for unmapped routes
 */
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    ok: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

/**
 * Global error handling middleware.
 * Guarantees no sensitive credentials, stack traces, or internal error details leak to clients.
 */
export function globalErrorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Check for JSON body parser syntax error or payload too large
  if (err instanceof SyntaxError && "body" in (err as unknown as Record<string, unknown>)) {
    res.status(400).json({
      success: false,
      ok: false,
      message: "Malformed JSON payload in request body.",
    });
    return;
  }

  const errObj = err as { type?: string; message?: string; status?: number };
  if (errObj && errObj.type === "entity.too.large") {
    res.status(413).json({
      success: false,
      ok: false,
      message: "Request payload too large. Maximum size is 50KB.",
    });
    return;
  }

  // Log error server-side with sanitized context
  console.error(
    `[Server Error] ${new Date().toISOString()}:`,
    err instanceof Error ? err.message : err
  );

  const statusCode = typeof errObj?.status === "number" ? errObj.status : 500;

  res.status(statusCode).json({
    success: false,
    ok: false,
    message:
      statusCode >= 500
        ? "An internal server error occurred while processing your request. Please try again or contact Parth Packaging directly at +91-9823370522."
        : errObj?.message || "Invalid request.",
    ...(config.nodeEnv === "development" && err instanceof Error
      ? { debugInfo: err.message }
      : {}),
  });
}
