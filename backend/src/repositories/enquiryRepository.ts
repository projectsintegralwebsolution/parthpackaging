import { DatabaseSync } from "node:sqlite";
import path from "path";
import fs from "fs";
import { config } from "../config/env.js";

export interface EnquiryRecord {
  id: string;
  reference_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  country_code: string;
  company_name: string;
  inquiry_mode: "supply" | "buyback" | "reconditioning";
  product_category: string;
  pallet_or_variant: string;
  quantity: string;
  delivery_location: string;
  specifications: string;
  privacy_consent: number;
  source_page_url: string;
  form_type: string;
  submission_timestamp: string;
  email_customer_status: "pending" | "sent" | "failed";
  email_owner_status: "pending" | "sent" | "failed";
  email_developer_status: "pending" | "sent" | "failed";
  email_customer_error: string | null;
  email_owner_error: string | null;
  email_developer_error: string | null;
  retry_count: number;
  created_at: string;
  updated_at: string;
}

export type NewEnquiryInput = Omit<
  EnquiryRecord,
  | "email_customer_status"
  | "email_owner_status"
  | "email_developer_status"
  | "email_customer_error"
  | "email_owner_error"
  | "email_developer_error"
  | "retry_count"
  | "created_at"
  | "updated_at"
>;

export interface EmailStatusUpdate {
  customer?: { status: "sent" | "failed"; error?: string | null };
  owner?: { status: "sent" | "failed"; error?: string | null };
  developer?: { status: "sent" | "failed"; error?: string | null };
}

class EnquiryRepository {
  private db: DatabaseSync;
  private dbPath: string;

  constructor() {
    // Resolve database directory and file path
    const dataDir = path.resolve(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Determine path from config.database.url or default
    if (config.database.url.startsWith("sqlite:")) {
      const rawPath = config.database.url.replace(/^sqlite:/, "");
      this.dbPath = path.resolve(process.cwd(), rawPath);
    } else {
      this.dbPath = path.join(dataDir, "enquiries.db");
    }

    // Ensure parent directory exists for this.dbPath
    const parentDir = path.dirname(this.dbPath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }

    this.db = new DatabaseSync(this.dbPath);
    this.initDatabase();
  }

  private initDatabase(): void {
    // Enable WAL mode for high durability and concurrent performance
    try {
      this.db.exec("PRAGMA journal_mode = WAL;");
      this.db.exec("PRAGMA synchronous = NORMAL;");
    } catch {
      // Non-fatal if WAL is already locked
    }

    // Create enquiries table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id TEXT PRIMARY KEY,
        reference_id TEXT UNIQUE NOT NULL,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        country_code TEXT DEFAULT '+91',
        company_name TEXT,
        inquiry_mode TEXT NOT NULL,
        product_category TEXT NOT NULL,
        pallet_or_variant TEXT,
        quantity TEXT,
        delivery_location TEXT,
        specifications TEXT,
        privacy_consent INTEGER DEFAULT 1,
        source_page_url TEXT,
        form_type TEXT DEFAULT 'Packaging Requirement Studio',
        submission_timestamp TEXT NOT NULL,
        email_customer_status TEXT DEFAULT 'pending',
        email_owner_status TEXT DEFAULT 'pending',
        email_developer_status TEXT DEFAULT 'pending',
        email_customer_error TEXT,
        email_owner_error TEXT,
        email_developer_error TEXT,
        retry_count INTEGER DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_enquiries_reference_id ON enquiries(reference_id);
      CREATE INDEX IF NOT EXISTS idx_enquiries_customer_email ON enquiries(customer_email);
      CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at);
      CREATE INDEX IF NOT EXISTS idx_enquiries_retry ON enquiries(email_customer_status, email_owner_status, email_developer_status, retry_count);
    `);
  }

  /**
   * Insert a new enquiry into persistent storage before attempting email dispatch.
   */
  public create(input: NewEnquiryInput): EnquiryRecord {
    const now = new Date().toISOString();
    const record: EnquiryRecord = {
      ...input,
      email_customer_status: "pending",
      email_owner_status: "pending",
      email_developer_status: "pending",
      email_customer_error: null,
      email_owner_error: null,
      email_developer_error: null,
      retry_count: 0,
      created_at: now,
      updated_at: now,
    };

    const stmt = this.db.prepare(`
      INSERT INTO enquiries (
        id, reference_id, customer_name, customer_email, customer_phone,
        country_code, company_name, inquiry_mode, product_category,
        pallet_or_variant, quantity, delivery_location, specifications,
        privacy_consent, source_page_url, form_type, submission_timestamp,
        email_customer_status, email_owner_status, email_developer_status,
        email_customer_error, email_owner_error, email_developer_error,
        retry_count, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?
      )
    `);

    stmt.run(
      record.id,
      record.reference_id,
      record.customer_name,
      record.customer_email,
      record.customer_phone,
      record.country_code,
      record.company_name,
      record.inquiry_mode,
      record.product_category,
      record.pallet_or_variant,
      record.quantity,
      record.delivery_location,
      record.specifications,
      record.privacy_consent,
      record.source_page_url,
      record.form_type,
      record.submission_timestamp,
      record.email_customer_status,
      record.email_owner_status,
      record.email_developer_status,
      record.email_customer_error,
      record.email_owner_error,
      record.email_developer_error,
      record.retry_count,
      record.created_at,
      record.updated_at
    );

    return record;
  }

  /**
   * Retrieve an enquiry by its human-readable reference ID.
   */
  public getByReferenceId(referenceId: string): EnquiryRecord | null {
    const stmt = this.db.prepare(
      "SELECT * FROM enquiries WHERE reference_id = ?"
    );
    const row = stmt.get(referenceId) as unknown as EnquiryRecord | undefined;
    return row || null;
  }

  /**
   * Retrieve an enquiry by its internal record ID.
   */
  public getById(id: string): EnquiryRecord | null {
    const stmt = this.db.prepare("SELECT * FROM enquiries WHERE id = ?");
    const row = stmt.get(id) as unknown as EnquiryRecord | undefined;
    return row || null;
  }

  /**
   * Update delivery statuses independently for each of the three email notifications.
   */
  public updateEmailStatus(
    referenceId: string,
    updates: EmailStatusUpdate
  ): void {
    const existing = this.getByReferenceId(referenceId);
    if (!existing) return;

    const now = new Date().toISOString();
    const customerStatus = updates.customer
      ? updates.customer.status
      : existing.email_customer_status;
    const customerError = updates.customer
      ? updates.customer.error || null
      : existing.email_customer_error;

    const ownerStatus = updates.owner
      ? updates.owner.status
      : existing.email_owner_status;
    const ownerError = updates.owner
      ? updates.owner.error || null
      : existing.email_owner_error;

    const developerStatus = updates.developer
      ? updates.developer.status
      : existing.email_developer_status;
    const developerError = updates.developer
      ? updates.developer.error || null
      : existing.email_developer_error;

    const stmt = this.db.prepare(`
      UPDATE enquiries SET
        email_customer_status = ?,
        email_customer_error = ?,
        email_owner_status = ?,
        email_owner_error = ?,
        email_developer_status = ?,
        email_developer_error = ?,
        updated_at = ?
      WHERE reference_id = ?
    `);

    stmt.run(
      customerStatus,
      customerError,
      ownerStatus,
      ownerError,
      developerStatus,
      developerError,
      now,
      referenceId
    );
  }

  /**
   * Increment retry counter when a retry cycle executes for an enquiry.
   */
  public incrementRetryCount(referenceId: string): void {
    const stmt = this.db.prepare(`
      UPDATE enquiries SET
        retry_count = retry_count + 1,
        updated_at = ?
      WHERE reference_id = ?
    `);
    stmt.run(new Date().toISOString(), referenceId);
  }

  /**
   * Find enquiries that have pending or failed emails eligible for retry (retry_count < maxRetries).
   */
  public getPendingRetries(maxRetries: number = 5): EnquiryRecord[] {
    const stmt = this.db.prepare(`
      SELECT * FROM enquiries
      WHERE (
        email_customer_status != 'sent' OR
        email_owner_status != 'sent' OR
        email_developer_status != 'sent'
      )
      AND retry_count < ?
      ORDER BY created_at ASC
      LIMIT 25
    `);
    return stmt.all(maxRetries) as unknown as EnquiryRecord[];
  }

  /**
   * Total count of recorded enquiries for health check & diagnostic reporting.
   */
  public countTotal(): number {
    const stmt = this.db.prepare("SELECT COUNT(*) as count FROM enquiries");
    const result = stmt.get() as { count: number } | undefined;
    return result?.count || 0;
  }
}

// Singleton repository instance
export const enquiryRepository = new EnquiryRepository();
