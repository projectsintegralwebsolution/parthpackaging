"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ClipboardList,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Send,
  MessageSquare,
  RotateCcw,
} from "lucide-react";
import {
  SITE_CONFIG,
  PRODUCT_CATEGORIES,
  EXTENDED_PRODUCT_OFFERINGS,
} from "@/config/site";

export type InquiryMode = "supply" | "buyback" | "reconditioning";

interface PackagingRequirementStudioProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
  initialMode?: InquiryMode;
}

interface FormValues {
  fullName: string;
  companyName: string;
  email: string;
  countryCode: string;
  phone: string;
  inquiryMode: InquiryMode;
  productCategory: string;
  palletOrVariant: string;
  quantity: string;
  deliveryLocation: string;
  specifications: string;
  privacyConsent: boolean;
}

interface SubmissionResult {
  referenceId: string;
  timestamp: string;
  emailDispatched: boolean;
  deliveryMode: string;
  message: string;
  record: FormValues;
}

const COUNTRY_CODES = [
  { code: "+91", label: "🇮🇳 +91 (India)" },
  { code: "+971", label: "🇦🇪 +971 (UAE)" },
  { code: "+1", label: "🇺🇸 +1 (US/CA)" },
  { code: "+44", label: "🇬🇧 +44 (UK)" },
  { code: "+65", label: "🇸🇬 +65 (SG)" },
  { code: "+49", label: "🇩🇪 +49 (DE)" },
  { code: "+966", label: "🇸🇦 +966 (KSA)" },
];

const VARIANT_OPTIONS_BY_PRODUCT: Record<string, string[]> = {
  "Reconditioning IBC": [
    "Steel Pallet Base (1000 Ltr.)",
    "Plastic Pallet Base (1000 Ltr.)",
    "Wood Pallet Base (1000 Ltr.)",
    "Any Standard Pallet (Ready Stock)",
  ],
  "Reconditioning Plastic Drums": [
    "Tight Head / Closed Head (200 Ltr.)",
    "Open Top with Ring Lock",
    "SL-Ring Barrel (100 Ltr.)",
    "Mixed Open & Tight Head Batch",
  ],
  "Reconditioning Carboys": [
    "35 Ltr. & 50 Ltr. Narrow/Wide Mouth",
    "20 Ltr. & 30 Ltr. Jerrycan / Carboy",
    "100 Ltr. Wide-Mouth Can / Barrel",
  ],
  "Fiber Drums": [
    "Standard Size (12/18\" to 18/28\")",
    "With Moisture Protection Barrier",
    "Customized for Welding-Wire Industry",
  ],
};

export default function PackagingRequirementStudio({
  isOpen,
  onClose,
  initialProduct,
  initialMode = "supply",
}: PackagingRequirementStudioProps) {
  const [values, setValues] = useState<FormValues>({
    fullName: "",
    companyName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    inquiryMode: initialMode,
    productCategory: initialProduct || "Reconditioning IBC",
    palletOrVariant: "",
    quantity: "",
    deliveryLocation: "",
    specifications: "",
    privacyConsent: false,
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAdvancedSpecs, setShowAdvancedSpecs] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);

  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialProduct) {
      setValues((prev) => ({
        ...prev,
        productCategory: initialProduct,
        palletOrVariant: "",
      }));
    }
    if (initialMode) {
      setValues((prev) => ({ ...prev, inquiryMode: initialMode }));
    }
  }, [initialProduct, initialMode]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 150);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const validateField = (name: keyof FormValues, val: unknown): string => {
    switch (name) {
      case "fullName":
        return typeof val === "string" && val.trim().length >= 2
          ? ""
          : "Full name is required (minimum 2 characters).";
      case "companyName":
        return typeof val === "string" && val.trim().length >= 2
          ? ""
          : "Company name is required.";
      case "email":
        return typeof val === "string" &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
          ? ""
          : "Enter a valid business email address (e.g. name@company.com).";
      case "phone": {
        const cleaned =
          typeof val === "string" ? val.replace(/[\s\-()]/g, "") : "";
        return /^\d{7,15}$/.test(cleaned)
          ? ""
          : "Enter a valid 7 to 15 digit phone/mobile number.";
      }
      case "productCategory":
        return typeof val === "string" && val.trim().length > 0
          ? ""
          : "Please select a product or packaging category.";
      case "privacyConsent":
        return val === true
          ? ""
          : "Please confirm consent to our privacy terms before submitting.";
      default:
        return "";
    }
  };

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};
    (
      [
        "fullName",
        "companyName",
        "email",
        "phone",
        "productCategory",
        "privacyConsent",
      ] as (keyof FormValues)[]
    ).forEach((field) => {
      const err = validateField(field, values[field]);
      if (err) newErrors[field] = err;
    });
    setErrors(newErrors);
    setTouched({
      fullName: true,
      companyName: true,
      email: true,
      phone: true,
      productCategory: true,
      privacyConsent: true,
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    field: keyof FormValues,
    value: string | boolean
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, values[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setSubmitError(
          data.message || "Please verify all required fields and try again."
        );
        setIsSubmitting(false);
        return;
      }

      setSubmissionResult(data);
    } catch {
      setSubmitError(
        "Network error while recording your requirement. Please try again or reach us directly via phone or WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setSubmitError(null);
    setTouched({});
    setErrors({});
    setValues((prev) => ({
      ...prev,
      palletOrVariant: "",
      quantity: "",
      specifications: "",
      privacyConsent: false,
    }));
  };

  // Match selected category for live visual preview in Studio left panel
  const matchedCategory =
    PRODUCT_CATEGORIES.find(
      (c) =>
        values.productCategory
          .toLowerCase()
          .includes(c.shortName.toLowerCase()) ||
        c.name.toLowerCase().includes(values.productCategory.toLowerCase())
    ) || PRODUCT_CATEGORIES[0];

  const availableVariants =
    VARIANT_OPTIONS_BY_PRODUCT[matchedCategory.shortName] || [];

  // Construct direct WhatsApp & mailto links for optional instant dispatch after validation
  const buildFormattedBrief = (refId?: string) => {
    return [
      `Parth Packaging Enquiry${refId ? ` (Ref: ${refId})` : ""}`,
      `Type: ${values.inquiryMode.toUpperCase()}`,
      `Name: ${values.fullName}`,
      `Company: ${values.companyName}`,
      `Email: ${values.email}`,
      `Phone: ${values.countryCode} ${values.phone}`,
      `Product: ${values.productCategory}`,
      values.palletOrVariant ? `Configuration: ${values.palletOrVariant}` : "",
      values.quantity ? `Approx. Quantity: ${values.quantity}` : "",
      values.deliveryLocation ? `Location: ${values.deliveryLocation}` : "",
      values.specifications ? `Notes: ${values.specifications}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="studio-drawer-title"
          className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs"
        >
          {/* Backdrop Click to Close */}
          <div
            aria-hidden="true"
            onClick={onClose}
            className="fixed inset-0"
          />

          {/* Slide-Over Split-Layout Studio Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            className="relative z-10 w-full max-w-5xl bg-white h-full shadow-2xl flex flex-col lg:flex-row overflow-hidden"
          >
            {/* Left Column: Branded Industrial Guide & Live Product Preview */}
            <div className="lg:w-[40%] bg-gradient-to-b from-[#0D1F33] via-[#11253D] to-[#0A1828] text-white p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-b lg:border-b-0 lg:border-r border-white/10">
              <div>
                <div className="flex items-center justify-between gap-2 pb-5 mb-5 border-b border-white/15">
                  <div className="bg-white px-3 py-1.5 rounded">
                    <img
                      src={SITE_CONFIG.logos.primary}
                      alt={SITE_CONFIG.logos.alt}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-blue-300 bg-white/10 px-2.5 py-1 rounded">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1769AA]" />
                    MPCB Approved
                  </span>
                </div>

                <span className="text-xs font-mono uppercase tracking-wider text-[#F20D16] font-bold">
                  Guided B2B Specification Desk
                </span>
                <h2
                  id="studio-drawer-title"
                  className="text-2xl sm:text-[26px] font-extrabold text-white mt-1 leading-tight"
                >
                  Packaging Requirement Studio
                </h2>
                <p className="mt-2.5 text-xs sm:text-sm text-white/80 leading-relaxed">
                  Specify your container requirements for bulk supply,
                  reconditioning, or empty drum buyback. Our MIDC Tarapur team
                  reviews specifications for capacity, pallet type, and dispatch
                  schedule.
                </p>

                {/* Live Visual Preview of Selected Product */}
                <div className="mt-5 rounded-xl bg-white text-[#292B29] p-4 border border-white/20">
                  <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#E2E2DE]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#747474]">
                      Selected Container Preview
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#F20D16]">
                      {matchedCategory.capacityRange}
                    </span>
                  </div>
                  <div className="h-32 w-full flex items-center justify-center p-2 bg-[#F5F5F3] rounded-lg">
                    <img
                      src={matchedCategory.image}
                      alt={matchedCategory.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <p className="mt-2.5 text-xs font-bold text-[#292B29] truncate">
                    {values.productCategory}
                  </p>
                  <p className="text-[11px] text-[#5C5E5C] mt-0.5">
                    {matchedCategory.compliance}
                  </p>
                </div>

                {/* How the Enquiry Process Works */}
                <div className="mt-6 space-y-3 hidden sm:block">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">
                    How Our B2B Process Works
                  </h3>
                  {[
                    {
                      step: "01",
                      title: "Submit Container & Volume Spec",
                      desc: "Select supply, reconditioning, or empty drum sell-back.",
                    },
                    {
                      step: "02",
                      title: "Stock & Quality Verification",
                      desc: "We confirm ready stock, pallet base, or pickup logistics.",
                    },
                    {
                      step: "03",
                      title: "Quotation & Timely Dispatch",
                      desc: "Direct factory pricing from our MIDC Tarapur unit.",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex items-start gap-3 text-xs"
                    >
                      <span className="font-mono font-bold text-[#F20D16] mt-0.5">
                        {item.step}
                      </span>
                      <div>
                        <span className="font-bold text-white">
                          {item.title}:{" "}
                        </span>
                        <span className="text-white/75">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Direct Contact Footer */}
              <div className="mt-6 pt-4 border-t border-white/15 text-xs space-y-2">
                <p className="font-bold uppercase tracking-wider text-white/60 text-[11px]">
                  Direct Factory &amp; Sales Desk:
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-white/90">
                  <a
                    href={SITE_CONFIG.contact.primaryMobileHref}
                    className="inline-flex items-center gap-1.5 hover:text-[#F20D16]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#F20D16]" />
                    <span>{SITE_CONFIG.contact.primaryMobile}</span>
                  </a>
                  <a
                    href={SITE_CONFIG.contact.factoryPhoneHref}
                    className="inline-flex items-center gap-1.5 hover:text-[#F20D16]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#F20D16]" />
                    <span>{SITE_CONFIG.contact.factoryPhone}</span>
                  </a>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.primaryEmail}`}
                    className="inline-flex items-center gap-1.5 hover:text-[#F20D16]"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#F20D16]" />
                    <span>{SITE_CONFIG.contact.primaryEmail}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form / Honest Submission State */}
            <div className="lg:w-[60%] bg-white flex flex-col h-full overflow-hidden">
              {/* Top Studio Action Bar */}
              <div className="px-6 py-4 bg-[#F5F5F3] border-b border-[#E2E2DE] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-[#F20D16]" />
                  <span className="text-xs sm:text-sm font-bold text-[#292B29]">
                    Configure Your Industrial Packaging Enquiry
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close Packaging Requirement Studio"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-[#292B29] text-[#292B29] hover:text-white border border-[#E2E2DE] text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>Close</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Form or Confirmation View */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1">
                {submissionResult ? (
                  <div className="space-y-6">
                    <div className="p-5 rounded-xl bg-[#F5F5F3] border-l-4 border-[#292B29]">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-[#F20D16] shrink-0 mt-0.5" />
                        <div>
                          <span className="inline-block text-xs font-mono font-bold text-[#F20D16] uppercase">
                            Reference ID: {submissionResult.referenceId}
                          </span>
                          <h3 className="text-lg font-extrabold text-[#292B29] mt-0.5">
                            Requirement Specification Validated &amp; Logged
                          </h3>
                          <p className="text-xs sm:text-sm text-[#3D3F3D] mt-1 leading-relaxed">
                            {submissionResult.message}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Recorded Summary Table */}
                    <div className="rounded-xl border border-[#E2E2DE] overflow-hidden">
                      <div className="bg-[#FAFAFA] px-4 py-2.5 border-b border-[#E2E2DE] text-xs font-bold uppercase tracking-wider text-[#292B29]">
                        Recorded Requirement Summary
                      </div>
                      <dl className="divide-y divide-[#E2E2DE] text-xs sm:text-sm">
                        <div className="px-4 py-2.5 grid grid-cols-3 gap-2">
                          <dt className="text-[#747474] font-medium">
                            Contact &amp; Company:
                          </dt>
                          <dd className="col-span-2 font-semibold text-[#292B29]">
                            {values.fullName} ({values.companyName})
                          </dd>
                        </div>
                        <div className="px-4 py-2.5 grid grid-cols-3 gap-2">
                          <dt className="text-[#747474] font-medium">
                            Email &amp; Phone:
                          </dt>
                          <dd className="col-span-2 font-semibold text-[#292B29]">
                            {values.email} • {values.countryCode} {values.phone}
                          </dd>
                        </div>
                        <div className="px-4 py-2.5 grid grid-cols-3 gap-2">
                          <dt className="text-[#747474] font-medium">
                            Requirement Mode:
                          </dt>
                          <dd className="col-span-2 font-bold uppercase text-[#F20D16]">
                            {values.inquiryMode}
                          </dd>
                        </div>
                        <div className="px-4 py-2.5 grid grid-cols-3 gap-2">
                          <dt className="text-[#747474] font-medium">
                            Product / Container:
                          </dt>
                          <dd className="col-span-2 font-semibold text-[#292B29]">
                            {values.productCategory}
                            {values.palletOrVariant
                              ? ` — ${values.palletOrVariant}`
                              : ""}
                          </dd>
                        </div>
                        {values.quantity && (
                          <div className="px-4 py-2.5 grid grid-cols-3 gap-2">
                            <dt className="text-[#747474] font-medium">
                              Quantity / Volume:
                            </dt>
                            <dd className="col-span-2 font-semibold text-[#292B29]">
                              {values.quantity}
                            </dd>
                          </div>
                        )}
                      </dl>
                    </div>

                    {/* Direct Dispatch Actions (WhatsApp or Mailto) */}
                    <div className="p-5 rounded-xl bg-[#FEF2F2]/60 border border-[#F20D16]/25 space-y-3">
                      <p className="text-xs font-bold text-[#292B29]">
                        Want to send this formatted specification directly to
                        our sales desk right now?
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <a
                          href={`https://wa.me/${
                            SITE_CONFIG.contact.whatsappNumber
                          }?text=${encodeURIComponent(
                            buildFormattedBrief(submissionResult.referenceId)
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-lg transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Send via WhatsApp Desk</span>
                        </a>
                        <a
                          href={`mailto:${
                            SITE_CONFIG.contact.primaryEmail
                          }?subject=${encodeURIComponent(
                            `Packaging Enquiry [${submissionResult.referenceId}] - ${values.companyName}`
                          )}&body=${encodeURIComponent(
                            buildFormattedBrief(submissionResult.referenceId)
                          )}`}
                          className="inline-flex items-center justify-center gap-2 bg-[#292B29] hover:bg-[#181A18] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-lg transition-colors"
                        >
                          <Mail className="w-4 h-4 text-[#F20D16]" />
                          <span>Open in Email Client</span>
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#292B29] hover:text-[#F20D16] cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Configure Another Requirement</span>
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-md bg-[#292B29] text-white text-xs font-bold cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    {submitError && (
                      <div
                        role="alert"
                        className="p-3.5 rounded-lg bg-[#FEF2F2] border border-[#F20D16] text-xs font-semibold text-[#C80910] flex items-start gap-2.5"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Requirement Mode Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#292B29] mb-2">
                        1. Select Requirement Type{" "}
                        <span className="text-[#F20D16]">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(
                          [
                            {
                              id: "supply",
                              label: "Buy Containers (Supply)",
                            },
                            {
                              id: "buyback",
                              label: "Sell Empty Drums",
                            },
                            {
                              id: "reconditioning",
                              label: "Reconditioning Service",
                            },
                          ] as { id: InquiryMode; label: string }[]
                        ).map((mode) => {
                          const active = values.inquiryMode === mode.id;
                          return (
                            <button
                              key={mode.id}
                              type="button"
                              onClick={() =>
                                handleChange("inquiryMode", mode.id)
                              }
                              className={`py-2.5 px-3 rounded-lg text-xs font-bold border text-center transition-all cursor-pointer ${
                                active
                                  ? "bg-[#292B29] text-white border-[#292B29] shadow-xs"
                                  : "bg-[#F5F5F3] text-[#292B29] border-[#E2E2DE] hover:border-[#747474]"
                              }`}
                            >
                              {mode.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Contact Identity Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="studio-fullName"
                          className="block text-xs font-bold text-[#292B29] mb-1.5"
                        >
                          Full Name <span className="text-[#F20D16]">*</span>
                        </label>
                        <input
                          ref={firstInputRef}
                          id="studio-fullName"
                          type="text"
                          required
                          value={values.fullName}
                          onChange={(e) =>
                            handleChange("fullName", e.target.value)
                          }
                          onBlur={() => handleBlur("fullName")}
                          placeholder="e.g. Rajesh Sharma"
                          aria-invalid={Boolean(errors.fullName)}
                          aria-describedby={
                            errors.fullName ? "err-fullName" : undefined
                          }
                          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#292B29] bg-white focus:outline-none focus:ring-2 focus:ring-[#F20D16] ${
                            errors.fullName
                              ? "border-[#F20D16] bg-[#FEF2F2]/30"
                              : "border-[#E2E2DE]"
                          }`}
                        />
                        {errors.fullName && (
                          <p
                            id="err-fullName"
                            className="mt-1 text-xs font-medium text-[#C80910]"
                          >
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="studio-companyName"
                          className="block text-xs font-bold text-[#292B29] mb-1.5"
                        >
                          Company Name <span className="text-[#F20D16]">*</span>
                        </label>
                        <input
                          id="studio-companyName"
                          type="text"
                          required
                          value={values.companyName}
                          onChange={(e) =>
                            handleChange("companyName", e.target.value)
                          }
                          onBlur={() => handleBlur("companyName")}
                          placeholder="e.g. Apex Specialty Chemicals Pvt. Ltd."
                          aria-invalid={Boolean(errors.companyName)}
                          aria-describedby={
                            errors.companyName ? "err-companyName" : undefined
                          }
                          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#292B29] bg-white focus:outline-none focus:ring-2 focus:ring-[#F20D16] ${
                            errors.companyName
                              ? "border-[#F20D16] bg-[#FEF2F2]/30"
                              : "border-[#E2E2DE]"
                          }`}
                        />
                        {errors.companyName && (
                          <p
                            id="err-companyName"
                            className="mt-1 text-xs font-medium text-[#C80910]"
                          >
                            {errors.companyName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email & Phone with Country Code */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="studio-email"
                          className="block text-xs font-bold text-[#292B29] mb-1.5"
                        >
                          Business Email{" "}
                          <span className="text-[#F20D16]">*</span>
                        </label>
                        <input
                          id="studio-email"
                          type="email"
                          required
                          value={values.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          onBlur={() => handleBlur("email")}
                          placeholder="procurement@company.com"
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={
                            errors.email ? "err-email" : undefined
                          }
                          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#292B29] bg-white focus:outline-none focus:ring-2 focus:ring-[#F20D16] ${
                            errors.email
                              ? "border-[#F20D16] bg-[#FEF2F2]/30"
                              : "border-[#E2E2DE]"
                          }`}
                        />
                        {errors.email && (
                          <p
                            id="err-email"
                            className="mt-1 text-xs font-medium text-[#C80910]"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="studio-phone"
                          className="block text-xs font-bold text-[#292B29] mb-1.5"
                        >
                          Phone / Mobile Number{" "}
                          <span className="text-[#F20D16]">*</span>
                        </label>
                        <div className="flex gap-1.5">
                          <select
                            aria-label="Country code"
                            value={values.countryCode}
                            onChange={(e) =>
                              handleChange("countryCode", e.target.value)
                            }
                            className="w-[115px] px-2 py-2.5 rounded-lg border border-[#E2E2DE] bg-[#F5F5F3] text-xs font-semibold text-[#292B29] focus:outline-none focus:ring-2 focus:ring-[#F20D16]"
                          >
                            {COUNTRY_CODES.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.label}
                              </option>
                            ))}
                          </select>
                          <input
                            id="studio-phone"
                            type="tel"
                            required
                            value={values.phone}
                            onChange={(e) =>
                              handleChange("phone", e.target.value)
                            }
                            onBlur={() => handleBlur("phone")}
                            placeholder="9823370522"
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby={
                              errors.phone ? "err-phone" : undefined
                            }
                            className={`flex-1 min-w-0 px-3.5 py-2.5 rounded-lg border text-sm text-[#292B29] bg-white focus:outline-none focus:ring-2 focus:ring-[#F20D16] ${
                              errors.phone
                                ? "border-[#F20D16] bg-[#FEF2F2]/30"
                                : "border-[#E2E2DE]"
                            }`}
                          />
                        </div>
                        {errors.phone && (
                          <p
                            id="err-phone"
                            className="mt-1 text-xs font-medium text-[#C80910]"
                          >
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Product or Packaging Requirement Selection */}
                    <div>
                      <label
                        htmlFor="studio-productCategory"
                        className="block text-xs font-bold text-[#292B29] mb-1.5"
                      >
                        Product or Packaging Requirement{" "}
                        <span className="text-[#F20D16]">*</span>
                      </label>
                      <select
                        id="studio-productCategory"
                        value={values.productCategory}
                        onChange={(e) => {
                          handleChange("productCategory", e.target.value);
                          handleChange("palletOrVariant", "");
                        }}
                        onBlur={() => handleBlur("productCategory")}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E2DE] bg-white text-sm font-semibold text-[#292B29] focus:outline-none focus:ring-2 focus:ring-[#F20D16]"
                      >
                        <optgroup label="Core Reconditioned Categories">
                          {PRODUCT_CATEGORIES.map((c) => (
                            <option key={c.id} value={c.shortName}>
                              {c.name} ({c.capacityRange})
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Specific Drum & Tank Offerings">
                          {EXTENDED_PRODUCT_OFFERINGS.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                      {errors.productCategory && (
                        <p className="mt-1 text-xs font-medium text-[#C80910]">
                          {errors.productCategory}
                        </p>
                      )}
                    </div>

                    {/* Progressive Disclosure Toggle for Configuration, Quantity & Location */}
                    <div className="rounded-xl border border-[#E2E2DE] bg-[#F5F5F3]/70 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setShowAdvancedSpecs((prev) => !prev)}
                        className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-bold text-[#292B29] hover:bg-[#EBEBE7]/60 transition-colors cursor-pointer"
                      >
                        <span>
                          2. Container Configuration, Quantity &amp; Delivery
                          Location
                        </span>
                        {showAdvancedSpecs ? (
                          <ChevronUp className="w-4 h-4 text-[#F20D16]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#747474]" />
                        )}
                      </button>

                      {showAdvancedSpecs && (
                        <div className="p-4 pt-2 border-t border-[#E2E2DE] bg-white space-y-4">
                          {availableVariants.length > 0 && (
                            <div>
                              <label className="block text-xs font-bold text-[#292B29] mb-1.5">
                                Preferred Pallet / Drum Configuration
                              </label>
                              <div className="flex flex-wrap gap-1.5">
                                {availableVariants.map((variant) => {
                                  const selected =
                                    values.palletOrVariant === variant;
                                  return (
                                    <button
                                      key={variant}
                                      type="button"
                                      onClick={() =>
                                        handleChange(
                                          "palletOrVariant",
                                          selected ? "" : variant
                                        )
                                      }
                                      className={`text-xs font-semibold px-3 py-1.5 rounded-md border transition-colors cursor-pointer ${
                                        selected
                                          ? "bg-[#F20D16] text-white border-[#F20D16]"
                                          : "bg-[#F5F5F3] text-[#292B29] border-[#E2E2DE] hover:border-[#292B29]"
                                      }`}
                                    >
                                      {variant}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="studio-quantity"
                                className="block text-xs font-bold text-[#292B29] mb-1.5"
                              >
                                Approximate Quantity / Requirement
                              </label>
                              <input
                                id="studio-quantity"
                                type="text"
                                value={values.quantity}
                                onChange={(e) =>
                                  handleChange("quantity", e.target.value)
                                }
                                placeholder="e.g. 50 Nos. / Monthly Bulk"
                                className="w-full px-3.5 py-2 rounded-lg border border-[#E2E2DE] text-sm text-[#292B29] bg-white focus:outline-none focus:ring-2 focus:ring-[#F20D16]"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="studio-location"
                                className="block text-xs font-bold text-[#292B29] mb-1.5"
                              >
                                Plant / Delivery Location
                              </label>
                              <input
                                id="studio-location"
                                type="text"
                                value={values.deliveryLocation}
                                onChange={(e) =>
                                  handleChange(
                                    "deliveryLocation",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g. MIDC Tarapur / Vapi / Mumbai"
                                className="w-full px-3.5 py-2 rounded-lg border border-[#E2E2DE] text-sm text-[#292B29] bg-white focus:outline-none focus:ring-2 focus:ring-[#F20D16]"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Multiline Field for Specifications or Additional Details */}
                    <div>
                      <label
                        htmlFor="studio-specifications"
                        className="block text-xs font-bold text-[#292B29] mb-1.5"
                      >
                        Specifications or Additional Details (Material stored,
                        size in inches/litres, schedule)
                      </label>
                      <textarea
                        id="studio-specifications"
                        rows={3}
                        value={values.specifications}
                        onChange={(e) =>
                          handleChange("specifications", e.target.value)
                        }
                        placeholder="Specify chemical compatibility needs, open/tight head preference, fiber drum size (12/18 to 18/28 inch), or empty container buyback details..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E2DE] text-sm text-[#292B29] bg-white focus:outline-none focus:ring-2 focus:ring-[#F20D16]"
                      />
                    </div>

                    {/* Privacy Consent */}
                    <div>
                      <label className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={values.privacyConsent}
                          onChange={(e) =>
                            handleChange("privacyConsent", e.target.checked)
                          }
                          onBlur={() => handleBlur("privacyConsent")}
                          className="mt-0.5 w-4 h-4 accent-[#F20D16] rounded cursor-pointer"
                        />
                        <span className="text-xs text-[#3D3F3D] leading-relaxed">
                          I consent to Parth Packaging processing my business
                          contact details and packaging specifications to
                          respond to this commercial enquiry in accordance with
                          applicable privacy terms.{" "}
                          <span className="text-[#F20D16] font-bold">*</span>
                        </span>
                      </label>
                      {errors.privacyConsent && (
                        <p className="mt-1 text-xs font-medium text-[#C80910]">
                          {errors.privacyConsent}
                        </p>
                      )}
                    </div>

                    {/* Submit Enquiry CTA */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <span className="text-[11px] text-[#747474]">
                        Fields marked with{" "}
                        <span className="text-[#F20D16] font-bold">*</span> are
                        required.
                      </span>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 bg-[#F20D16] hover:bg-[#C80910] disabled:opacity-60 text-white font-bold text-sm px-7 py-3.5 rounded-lg shadow-md transition-all cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Validating Specification...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Enquiry</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
