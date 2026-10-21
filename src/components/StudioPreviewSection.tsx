"use client";

import React, { useState } from "react";
import {
  ClipboardList,
  ArrowUpRight,
  CheckCircle2,
  Recycle,
  Package,
  Sparkles,
} from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/config/site";
import { InquiryMode } from "./PackagingRequirementStudio";

interface StudioPreviewSectionProps {
  onOpenEnquiry: (preselectedProduct?: string, mode?: InquiryMode) => void;
}

export default function StudioPreviewSection({
  onOpenEnquiry,
}: StudioPreviewSectionProps) {
  const [selectedMode, setSelectedMode] = useState<InquiryMode>("supply");
  const [selectedProduct, setSelectedProduct] = useState<string>(
    PRODUCT_CATEGORIES[0].shortName
  );

  const activeCategory =
    PRODUCT_CATEGORIES.find((c) => c.shortName === selectedProduct) ||
    PRODUCT_CATEGORIES[0];

  return (
    <section
      id="requirement-studio-section"
      aria-labelledby="studio-section-heading"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E2E2DE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#0D1F33] via-[#11253D] to-[#1769AA]/25 text-white border border-[#1E3A5F] overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left 7 Columns: Interactive Step-by-Step Selector */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1769AA]/20 border border-[#1769AA]/40 text-xs font-bold uppercase tracking-wider text-blue-200 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                  <span>Interactive B2B Specification Experience</span>
                </div>

                <h2
                  id="studio-section-heading"
                  className="text-[26px] sm:text-[34px] lg:text-[38px] font-extrabold text-white leading-[1.15]"
                >
                  Packaging Requirement{" "}
                  <span className="text-white">Studio</span>
                </h2>
                <p className="mt-3 text-sm sm:text-[16px] text-white/80 leading-relaxed max-w-2xl">
                  Whether you are procuring reconditioned containers in bulk,
                  scheduling decontamination services, or selling empty drums
                  and IBCs from your plant, configure your requirement below to
                  launch our guided specification desk.
                </p>

                {/* Step 1: Select Requirement Mode */}
                <div className="mt-7">
                  <span className="block text-xs font-mono uppercase tracking-wider text-blue-200/75 mb-2.5">
                    Step 01 — Choose Requirement Pathway
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      {
                        id: "supply" as InquiryMode,
                        title: "Bulk Container Supply",
                        sub: "Buy Reconditioned IBCs & Drums",
                        icon: Package,
                      },
                      {
                        id: "buyback" as InquiryMode,
                        title: "Sell Empty Containers",
                        sub: "Used Drum & IBC Buyback",
                        icon: Recycle,
                      },
                      {
                        id: "reconditioning" as InquiryMode,
                        title: "Washing & Reconditioning",
                        sub: "MPCB Authorized Cleaning",
                        icon: ClipboardList,
                      },
                    ].map((m) => {
                      const Icon = m.icon;
                      const isSelected = selectedMode === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setSelectedMode(m.id)}
                          className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#1769AA] border-[#1769AA] text-white shadow-lg"
                              : "bg-white/5 border-white/12 text-white/80 hover:bg-white/10"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 mb-1.5 ${
                              isSelected ? "text-white" : "text-[#1769AA]"
                            }`}
                          />
                          <span className="block text-xs sm:text-[13px] font-bold">
                            {m.title}
                          </span>
                          <span
                            className={`block text-[11px] mt-0.5 ${
                              isSelected ? "text-white/90" : "text-white/55"
                            }`}
                          >
                            {m.sub}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Select Primary Container Category */}
                <div className="mt-6">
                  <span className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2.5">
                    Step 02 — Select Primary Packaging Category
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {PRODUCT_CATEGORIES.map((cat) => {
                      const isSelected = selectedProduct === cat.shortName;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedProduct(cat.shortName)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "bg-white text-[#292B29] border-white font-bold"
                              : "bg-white/5 text-white/80 border-white/12 hover:bg-white/10"
                          }`}
                        >
                          <span className="block text-xs font-bold leading-snug">
                            {cat.shortName}
                          </span>
                          <span
                            className={`block text-[10.5px] font-mono mt-1 ${
                              isSelected ? "text-[#F20D16]" : "text-white/50"
                            }`}
                          >
                            {cat.capacityRange}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 3: Launch Guided Studio Drawer */}
              <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-white/75">
                  Selected:{" "}
                  <strong className="text-white uppercase">
                    {selectedMode}
                  </strong>{" "}
                  •{" "}
                  <strong className="text-[#F20D16]">{selectedProduct}</strong>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenEnquiry(selectedProduct, selectedMode)}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#F20D16] hover:bg-[#C80910] text-white font-bold text-sm sm:text-[15px] px-6 py-3.5 rounded-lg shadow-lg transition-all cursor-pointer"
                >
                  <ClipboardList className="w-4 h-4" />
                  <span>Launch Requirement Studio</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right 5 Columns: Live Product Visual Card */}
            <div className="lg:col-span-5 bg-[#0B1A2A]/85 border-t lg:border-t-0 lg:border-l border-white/10 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs pb-3 mb-4 border-b border-white/10">
                  <span className="font-mono uppercase text-blue-200/70">
                    Active Specification Preview
                  </span>
                  <span className="font-mono font-bold text-blue-300">
                    {activeCategory.capacityRange}
                  </span>
                </div>

                <div className="h-56 w-full bg-white rounded-2xl p-5 flex items-center justify-center border border-white/15">
                  <img
                    src={activeCategory.image}
                    alt={activeCategory.name}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-white">
                  {activeCategory.name}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-white/75 leading-relaxed">
                  {activeCategory.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                {activeCategory.keyFeatures.slice(0, 3).map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-2 text-xs text-white/85"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1769AA] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
