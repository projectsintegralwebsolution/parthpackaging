"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Warehouse,
  FileCheck2,
  Eye,
  X,
  Quote,
  Recycle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  RECONDITIONING_PROCESS_STEPS,
  WAREHOUSE_FEATURES,
  SITE_CONFIG,
} from "@/config/site";

export default function QualityCapabilitiesSection() {
  const [certificateLightboxOpen, setCertificateLightboxOpen] = useState(false);

  return (
    <section
      id="quality-capabilities"
      aria-labelledby="quality-capabilities-heading"
      className="py-16 sm:py-20 lg:py-24 bg-[#F4F6F8] border-b border-[#E2E2DE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1769AA]/10 border border-[#1769AA]/20 text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-3.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1769AA]" />
            <span>Quality Policy, Reconditioning Process &amp; Warehousing</span>
          </div>
          <h2
            id="quality-capabilities-heading"
            className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-[#292B29] leading-[1.15]"
          >
            Decontamination Rigor,{" "}
            <span className="text-[#1769AA]">
              Closed-Loop ETP &amp; Organized Warehousing
            </span>
          </h2>
          <p className="mt-3.5 text-[16px] sm:text-[17px] text-[#3D3F3D] leading-relaxed">
            From chemical cleaning and 100% leak testing to segregated,
            pest-free warehousing in MIDC Tarapur, every stage of our operation
            is structured around safety, environmental compliance, and product
            integrity.
          </p>
        </div>

        {/* Part 1: 4-Stage Reconditioning Process Timeline */}
        <div className="bg-white rounded-2xl border border-[#E2E2DE] p-6 sm:p-8 lg:p-10 shadow-xs mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E2E2DE]">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1769AA]">
                Multi-Stage Industrial Protocol
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#292B29] mt-1">
                How We Recondition IBCs, Drums &amp; Carboys
              </h3>
            </div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold bg-[#EDF5FD] text-[#1769AA] px-3.5 py-2 rounded-lg border border-[#1769AA]/25 self-start sm:self-center">
              <Recycle className="w-4 h-4 text-[#1769AA]" />
              <span>Zero Outside Effluent Discharge (Closed-Loop ETP)</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RECONDITIONING_PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="relative rounded-xl bg-[#F4F6F8] border border-[#E2E2DE] p-5 flex flex-col justify-between hover:border-[#1769AA]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#1769AA] text-white font-mono text-xs font-bold shadow-xs">
                      {item.step}
                    </span>
                    <span className="h-[2px] flex-1 bg-[#E2E2DE] ml-3" />
                  </div>
                  <h4 className="text-base font-extrabold text-[#292B29] leading-snug">
                    {item.title}
                  </h4>
                  <p className="mt-2.5 text-xs sm:text-sm text-[#3D3F3D] leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E2E2DE] flex items-center gap-1.5 text-[11px] font-semibold text-[#1769AA]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Inspected by Trained Workforce</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Split Layout — Warehousing & Quality Policy vs. Official MPCB Certificate & Facility */}
        <div
          id="mpcb-compliance"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left 7 Columns: Official Quality Policy Statement + Warehousing & Packaging */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
            {/* Official Verified Quality Policy Block */}
            <div className="bg-gradient-to-br from-[#0D1F33] via-[#122B48] to-[#1769AA]/30 text-white rounded-2xl p-6 sm:p-8 border border-[#1769AA]/30 relative overflow-hidden shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#1769AA] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Quote className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-blue-300 font-bold">
                    Official Quality Policy Statement
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-1">
                    Customer Satisfaction Through Quality &amp; Continual Improvement
                  </h3>
                  <blockquote className="mt-3 text-sm sm:text-[15.5px] text-white/90 leading-relaxed italic">
                    “Our aim is to satisfy our customers with quality products
                    at affordable price, timely delivery, speedy response to
                    their needs and expectations, continual improvement in
                    product quality with latest technology.”
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Warehousing & Packaging Capabilities Card */}
            <div className="bg-white rounded-2xl border border-[#E2E2DE] p-6 sm:p-8 flex-1">
              <div className="flex items-center gap-2.5 mb-3">
                <Warehouse className="w-5 h-5 text-[#F20D16]" />
                <h3 className="text-xl font-extrabold text-[#292B29]">
                  Warehousing &amp; Safe Packaging Infrastructure
                </h3>
              </div>
              <p className="text-sm sm:text-[15px] text-[#3D3F3D] leading-relaxed">
                Recognizing the critical importance of contamination-free
                storage, our warehousing unit in MIDC Tarapur is segregated into
                clearly labeled sections so all reconditioned IBCs, plastic
                drums, fiber drums, and carboys are stocked systematically for
                rapid identification and dispatch.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WAREHOUSE_FEATURES.map((feat) => (
                  <div
                    key={feat.title}
                    className="p-4 rounded-xl bg-[#F5F5F3] border border-[#E2E2DE]"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F20D16] shrink-0" />
                      <h4 className="text-sm font-bold text-[#292B29]">
                        {feat.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#5C5E5C] mt-1.5 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Verified MPCB Consent Document & Reconditioning Inspection Visual */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E2E2DE] p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[#E2E2DE]">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-[#F20D16]" />
                  <h3 className="text-base sm:text-lg font-extrabold text-[#292B29]">
                    MPCB Statutory Authorization
                  </h3>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#F20D16] bg-[#FEF2F2] px-2.5 py-1 rounded border border-[#F20D16]/20">
                  Verified Consent
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#3D3F3D] leading-relaxed mb-4">
                Authorized by the{" "}
                <strong>Maharashtra Pollution Control Board (MPCB)</strong> under
                Water Act, Air Act &amp; Hazardous Wastes Rules for{" "}
                <strong>
                  reconditioning and washing of decontaminated M.S., Plastic,
                  and HDPE drums
                </strong>
                .
              </p>

              {/* Genuine MPCB Certificate Image Preview + Reconditioning Bay Photo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
                <div
                  onClick={() => setCertificateLightboxOpen(true)}
                  className="group relative rounded-xl overflow-hidden border border-[#E2E2DE] bg-[#F5F5F3] h-48 flex items-center justify-center cursor-pointer"
                >
                  <img
                    src="/images/mpcb-certificate.jpg"
                    alt="Maharashtra Pollution Control Board Consent to Operate Certificate for M/s. Parth Packaging"
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 bg-white text-[#292B29] text-xs font-bold px-3 py-1.5 rounded shadow">
                      <Eye className="w-3.5 h-3.5 text-[#F20D16]" />
                      Inspect Document
                    </span>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden border border-[#E2E2DE] bg-[#181A18] h-48">
                  <img
                    src="/images/facility/reconditioning-inspection.jpg"
                    alt="Reconditioned IBCs and blue HDPE plastic drums in quality inspection bay"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Technical Consent Highlights */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs py-2 px-3 rounded bg-[#F5F5F3] border border-[#E2E2DE]">
                  <span className="text-[#5C5E5C] font-medium">
                    Authority:
                  </span>
                  <span className="font-bold text-[#292B29]">
                    Maharashtra Pollution Control Board
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-2 px-3 rounded bg-[#F5F5F3] border border-[#E2E2DE]">
                  <span className="text-[#5C5E5C] font-medium">
                    Consent Reference:
                  </span>
                  <span className="font-mono font-semibold text-[#292B29]">
                    {SITE_CONFIG.mpcbConsentNo}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-2 px-3 rounded bg-[#F5F5F3] border border-[#E2E2DE]">
                  <span className="text-[#5C5E5C] font-medium">
                    Effluent Treatment:
                  </span>
                  <span className="font-semibold text-[#292B29]">
                    In-House ETP • Treated Water Reused
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCertificateLightboxOpen(true)}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-[#EDF5FD] hover:bg-[#1769AA] text-[#1769AA] hover:text-white border border-[#1769AA]/30 font-semibold text-xs sm:text-sm py-3 px-4 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Eye className="w-4 h-4" />
              <span>View Official MPCB Certificate Document</span>
            </button>
          </div>
        </div>
      </div>

      {/* MPCB Certificate Lightbox Modal */}
      <AnimatePresence>
        {certificateLightboxOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Official MPCB Certificate Document"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#E2E2DE] max-h-[92vh] flex flex-col"
            >
              <div className="px-5 py-3.5 bg-[#181A18] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#F20D16]" />
                  <span className="text-sm font-bold">
                    Maharashtra Pollution Control Board — M/s. Parth Packaging
                  </span>
                </div>
                <button
                  type="button"
                  aria-label="Close certificate viewer"
                  onClick={() => setCertificateLightboxOpen(false)}
                  className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 bg-[#F5F5F3] overflow-y-auto flex justify-center">
                <img
                  src="/images/mpcb-certificate.jpg"
                  alt="Official Maharashtra Pollution Control Board Certificate for M/s. Parth Packaging"
                  className="max-w-full h-auto rounded border border-[#E2E2DE] shadow"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
