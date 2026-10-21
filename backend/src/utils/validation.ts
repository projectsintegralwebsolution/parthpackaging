export interface RawEnquiryRequest {
  fullName?: unknown;
  name?: unknown;
  customerName?: unknown;
  companyName?: unknown;
  company?: unknown;
  email?: unknown;
  countryCode?: unknown;
  phone?: unknown;
  inquiryMode?: unknown;
  productCategory?: unknown;
  productName?: unknown;
  product?: unknown;
  palletOrVariant?: unknown;
  quantity?: unknown;
  deliveryLocation?: unknown;
  specifications?: unknown;
  message?: unknown;
  requirements?: unknown;
  privacyConsent?: unknown;
  sourcePageUrl?: unknown;
  formType?: unknown;
  // Honeypot spam trap
  website_hp?: unknown;
  honey_field?: unknown;
}

export interface ValidatedEnquiryData {
  fullName: string;
  companyName: string;
  email: string;
  countryCode: string;
  phone: string;
  inquiryMode: "supply" | "buyback" | "reconditioning";
  productCategory: string;
  palletOrVariant: string;
  quantity: string;
  deliveryLocation: string;
  specifications: string;
  privacyConsent: boolean;
  sourcePageUrl: string;
  formType: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  data?: ValidatedEnquiryData;
  isSpamBot?: boolean;
}

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function validateEnquiryRequest(
  payload: RawEnquiryRequest | null | undefined
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!payload || typeof payload !== "object") {
    return {
      isValid: false,
      errors: { form: "Invalid request payload. Please submit valid JSON." },
    };
  }

  // Honeypot check: if a bot fills either hidden field, silently flag as bot
  if (
    (typeof payload.website_hp === "string" && payload.website_hp.trim().length > 0) ||
    (typeof payload.honey_field === "string" && payload.honey_field.trim().length > 0)
  ) {
    return {
      isValid: false,
      isSpamBot: true,
      errors: { form: "Submission flagged by automated spam verification." },
    };
  }

  // 1. Full Name (accepts fullName, name, customerName)
  const rawFullName = payload.fullName ?? payload.name ?? payload.customerName;
  const fullName = typeof rawFullName === "string" ? rawFullName.trim() : "";
  if (!fullName || fullName.length < 2) {
    errors.fullName = "Please enter your full name (minimum 2 characters).";
  } else if (fullName.length > 100) {
    errors.fullName = "Name is too long (maximum 100 characters).";
  }

  // 2. Company Name (accepts companyName, company; defaults to 'Not Specified' if optional)
  const rawCompany = payload.companyName ?? payload.company;
  let companyName = typeof rawCompany === "string" ? rawCompany.trim() : "";
  if (companyName.length > 150) {
    errors.companyName = "Company name is too long (maximum 150 characters).";
  }

  // 3. Email (required, valid format)
  const email =
    typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  if (!email) {
    errors.email = "Please enter your business email address.";
  } else if (!EMAIL_REGEX.test(email) || email.length > 254) {
    errors.email = "Please enter a valid email address (e.g., name@company.com).";
  }

  // 4. Phone Number (required, 7-15 digits, strip +, spaces, dashes, parentheses)
  const rawPhone = typeof payload.phone === "string" ? payload.phone : "";
  const cleanPhone = rawPhone.replace(/[\s\-()+]/g, "");
  if (!cleanPhone) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^\d{7,15}$/.test(cleanPhone)) {
    errors.phone = "Please enter a valid phone number (7 to 15 digits).";
  }

  const countryCode =
    typeof payload.countryCode === "string" && payload.countryCode.trim()
      ? payload.countryCode.trim()
      : "+91";

  // 5. Inquiry Mode (supply | buyback | reconditioning)
  let inquiryMode: "supply" | "buyback" | "reconditioning" = "supply";
  if (
    payload.inquiryMode === "supply" ||
    payload.inquiryMode === "buyback" ||
    payload.inquiryMode === "reconditioning"
  ) {
    inquiryMode = payload.inquiryMode;
  }

  // 6. Product Category (accepts productCategory, productName, product)
  const rawProduct = payload.productCategory ?? payload.productName ?? payload.product;
  const productCategory =
    typeof rawProduct === "string" && rawProduct.trim()
      ? rawProduct.trim().slice(0, 150)
      : "General Industrial Packaging";

  // 7. Specifications / Message (accepts specifications, message, requirements)
  const rawSpecs = payload.specifications ?? payload.message ?? payload.requirements;
  const specifications =
    typeof rawSpecs === "string"
      ? rawSpecs.trim().slice(0, 4000)
      : "";

  // 8. Other optional fields with safety truncation
  const palletOrVariant =
    typeof payload.palletOrVariant === "string"
      ? payload.palletOrVariant.trim().slice(0, 150)
      : "";

  const quantity =
    typeof payload.quantity === "string"
      ? payload.quantity.trim().slice(0, 80)
      : "";

  const deliveryLocation =
    typeof payload.deliveryLocation === "string"
      ? payload.deliveryLocation.trim().slice(0, 150)
      : "";

  const sourcePageUrl =
    typeof payload.sourcePageUrl === "string"
      ? payload.sourcePageUrl.trim().slice(0, 500)
      : "";

  const formType =
    typeof payload.formType === "string" && payload.formType.trim()
      ? payload.formType.trim().slice(0, 100)
      : "Packaging Requirement Studio";

  // 9. Privacy Consent (defaults to true if omitted on general contact forms)
  const privacyConsent =
    payload.privacyConsent !== undefined ? Boolean(payload.privacyConsent) : true;

  if (Object.keys(errors).length > 0) {
    return {
      isValid: false,
      errors,
    };
  }

  return {
    isValid: true,
    errors: {},
    data: {
      fullName,
      companyName: companyName || "Not Specified",
      email,
      countryCode,
      phone: cleanPhone,
      inquiryMode,
      productCategory,
      palletOrVariant,
      quantity,
      deliveryLocation,
      specifications,
      privacyConsent,
      sourcePageUrl,
      formType,
    },
  };
}
