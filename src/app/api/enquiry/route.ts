import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export interface EnquiryPayload {
  fullName: string;
  companyName: string;
  email: string;
  countryCode: string;
  phone: string;
  inquiryMode: "supply" | "buyback" | "reconditioning";
  productCategory: string;
  palletOrVariant?: string;
  quantity: string;
  deliveryLocation?: string;
  specifications: string;
  privacyConsent: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<EnquiryPayload>;

    const errors: Record<string, string> = {};

    if (!body.fullName || body.fullName.trim().length < 2) {
      errors.fullName = "Please enter your full name (at least 2 characters).";
    }
    if (!body.companyName || body.companyName.trim().length < 2) {
      errors.companyName = "Please enter your company or organization name.";
    }
    if (
      !body.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())
    ) {
      errors.email = "Please enter a valid business email address.";
    }
    const cleanPhone = (body.phone || "").replace(/[\s\-()]/g, "");
    if (!cleanPhone || !/^\d{7,15}$/.test(cleanPhone)) {
      errors.phone = "Please enter a valid 7 to 15 digit phone number.";
    }
    if (!body.productCategory || body.productCategory.trim().length === 0) {
      errors.productCategory =
        "Please select a product or packaging category.";
    }
    if (!body.privacyConsent) {
      errors.privacyConsent =
        "Please confirm consent to Parth Packaging's privacy terms to proceed.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please review and correct the highlighted fields.",
          errors,
        },
        { status: 400 }
      );
    }

    const referenceId = `PP-${new Date().getFullYear()}-${Math.floor(
      100000 + Math.random() * 900000
    )}`;
    const timestamp = new Date().toISOString();

    const record = {
      referenceId,
      timestamp,
      fullName: body.fullName!.trim(),
      companyName: body.companyName!.trim(),
      email: body.email!.trim(),
      countryCode: (body.countryCode || "+91").trim(),
      phone: cleanPhone,
      inquiryMode: body.inquiryMode || "supply",
      productCategory: body.productCategory!.trim(),
      palletOrVariant: body.palletOrVariant?.trim() || "Standard Specification",
      quantity: body.quantity?.trim() || "Not specified",
      deliveryLocation: body.deliveryLocation?.trim() || "Not specified",
      specifications: body.specifications?.trim() || "",
      privacyConsent: Boolean(body.privacyConsent),
    };

    // Persist locally in .data/enquiries.json for development/staging verification
    try {
      const dataDir = path.join(process.cwd(), ".data");
      await fs.mkdir(dataDir, { recursive: true });
      const filePath = path.join(dataDir, "enquiries.json");
      let existing: unknown[] = [];
      try {
        const raw = await fs.readFile(filePath, "utf-8");
        existing = JSON.parse(raw);
      } catch {
        existing = [];
      }
      existing.unshift(record);
      await fs.writeFile(filePath, JSON.stringify(existing, null, 2), "utf-8");
    } catch {
      // Non-fatal on read-only serverless file systems
    }

    // Optional external webhook / email relay integration point
    const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
    let emailDispatched = false;

    if (webhookUrl) {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      emailDispatched = webhookRes.ok;
    }

    return NextResponse.json({
      ok: true,
      referenceId,
      timestamp,
      emailDispatched,
      deliveryMode: emailDispatched ? "live_webhook" : "staged_api",
      message: emailDispatched
        ? "Your packaging requirement has been submitted to Parth Packaging."
        : "Your packaging requirement specification has been validated and logged in the API staging store. Live SMTP/email relay will be activated upon production backend configuration.",
      record,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Unable to process the enquiry payload at this time. Please check your input or contact us directly via phone or WhatsApp.",
      },
      { status: 500 }
    );
  }
}
