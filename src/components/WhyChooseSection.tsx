"use client";

import React from "react";
import {
  ShieldCheck,
  Droplets,
  PackageCheck,
  Truck,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { WHY_CHOOSE_US } from "@/config/site";

interface WhyChooseSectionProps {
  onOpenEnquiry: (
    preselectedProduct?: string,
    mode?: "supply" | "buyback" | "reconditioning"
  ) => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  Droplets,
  PackageCheck,
  Truck,
};

const VENDOR_SELECTION_FACTORS = [
  "Production Capacity",
  "Cost Effectiveness",
  "Timely Delivery",
  "Ability to Meet Bulk Orders",
  "Established Customer Base",
];

export default function WhyChooseSection({
  onOpenEnquiry,
}: WhyChooseSectionProps) {
  return (
    <section
      aria-labelledby="why-choose-heading"
      className="py-16 sm:py-20 lg:py-24 bg-[#F4F6F8] text-[#292B29] border-b border-[#E2E2DE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Split Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#E2E2DE]">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1769AA]/10 border border-[#1769AA]/20 text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-3.5">
              <span className="w-2 h-2 rounded-full bg-[#1769AA]" />
              <span>Why Partner With Parth Packaging</span>
            </div>
            <h2
              id="why-choose-heading"
              className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-[#292B29] leading-[1.15]"
            >
              Proven Industrial Standards{" "}
              <span className="text-[#1769AA]">
                Backed by Verified Compliance
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-[16px] text-[#5C5E5C] leading-relaxed">
              With extensive industry experience since 1995 and strong
              associations with reputed industrial vendors, our procuring and
              reconditioning teams ensure consistent quality, contamination-free
              containers, and dependable bulk supply.
            </p>
          </div>
        </div>

        {/* 4 Core Advantages Architectural Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => {
            const IconComponent = ICON_MAP[item.iconName] || ShieldCheck;
            return (
              <div
                key={item.id}
                className="group relative bg-white hover:bg-white rounded-xl border border-[#E2E2DE] hover:border-[#1769AA] p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="w-12 h-12 rounded-lg bg-[#EDF5FD] border border-[#1769AA]/25 flex items-center justify-center text-[#1769AA] group-hover:bg-[#1769AA] group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#747474]">
                      0{idx + 1}
                    </span>
                  </div>

                  <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-[#1769AA] font-semibold mb-2">
                    {item.highlight}
                  </span>

                  <h3 className="text-lg font-bold text-[#292B29] leading-snug group-hover:text-[#1769AA] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#5C5E5C] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E2E2DE] flex items-center justify-between text-xs text-[#747474]">
                  <span>Verified Capability</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1769AA]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Verified Vendor Evaluation & Procurement Bar */}
        <div className="mt-10 rounded-xl bg-white border border-[#E2E2DE] shadow-xs p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-base sm:text-lg font-bold text-[#292B29]">
              Stringent Procurement &amp; Vendor Selection Criteria
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5E5C] mt-1 leading-relaxed">
              Our competent procuring agents evaluate every container batch and
              vendor partner across five well-defined operational parameters:
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {VENDOR_SELECTION_FACTORS.map((factor) => (
              <span
                key={factor}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#F4F6F8] border border-[#E2E2DE] text-xs font-semibold text-[#292B29]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1769AA] shrink-0" />
                <span>{factor}</span>
              </span>
            ))}
            <button
              type="button"
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1769AA] hover:bg-[#115293] text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
            >
              <span>Discuss Bulk Order</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
