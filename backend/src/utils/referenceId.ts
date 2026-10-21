import crypto from "crypto";

/**
 * Generates an authoritative, human-readable enquiry reference ID.
 * Format: PP-YYYY-XXXXXX (e.g. PP-2026-834912)
 */
export function generateReferenceId(): string {
  const currentYear = new Date().getFullYear();
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  return `PP-${currentYear}-${randomSuffix}`;
}

/**
 * Generates an internal database UUID string.
 */
export function generateRecordId(): string {
  return crypto.randomUUID();
}
