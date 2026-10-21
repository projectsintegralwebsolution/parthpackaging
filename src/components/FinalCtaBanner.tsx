"use client";

import React from "react";
import {
  Phone,
  ClipboardList,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { InquiryMode } from "./PackagingRequirementStudio";

interface FinalCtaBannerProps {
  onOpenEnquiry: (preselectedProduct?: string, mode?: InquiryMode) => void;
}

export default function FinalCtaBanner({ onOpenEnquiry }: FinalCtaBannerProps) {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative py-16 sm:py-20 bg-[#0D1F33] text-white overflow-hidden border-b border-[#1E3A5F]"
    >
      {/* Background Logistics Yard Image with 50% Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/facility/industrial-logistics-yard.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-full h-full object-cover opacity-45"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0D1F33]/90 via-[#0D1F33]/70 to-[#1769AA]/35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/30"
        />
      </div>

      {/* Top Red & Blue Dual Accent Rule */}
      <div className="absolute top-0 left-0 right-0 h-1.5 flex">
        <div className="w-1/2 bg-[#F20D16]" />
        <div className="w-1/2 bg-[#1769AA]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-blue-300 mb-3">
              <MapPin className="w-3.5 h-3.5 text-[#F20D16]" />
              Direct Dispatch from MIDC Tarapur, Boisar • Serving Pan-India
            </span>
            <h2
              id="final-cta-heading"
              className="text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-white leading-[1.15]"
            >
              Ready to Discuss Your Industrial Packaging Requirements?
            </h2>
            <p className="mt-3.5 text-base sm:text-[17px] text-white/80 leading-relaxed">
              Connect with Parth Packaging for contamination-free Reconditioned
              IBCs, ISI-compliant HDPE Plastic Drums, Carboys, and Fiber Drums,
              or enquire about selling your empty industrial containers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center justify-center gap-2.5 bg-[#F20D16] hover:bg-[#C80910] text-white font-bold text-[15px] px-7 py-4 rounded-lg shadow-lg shadow-[#F20D16]/25 transition-all cursor-pointer"
            >
              <ClipboardList className="w-4 h-4" />
              <span>Request an Enquiry</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href={SITE_CONFIG.contact.primaryMobileHref}
              className="inline-flex items-center justify-center gap-2.5 bg-[#1769AA] hover:bg-[#115293] text-white font-bold text-[15px] px-6 py-4 rounded-lg shadow-sm transition-all"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Call {SITE_CONFIG.contact.primaryMobile}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
