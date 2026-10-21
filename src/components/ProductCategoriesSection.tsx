"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardList,
  Layers,
  SlidersHorizontal,
  X,
  ShieldCheck,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PRODUCT_CATEGORIES,
  EXTENDED_PRODUCT_OFFERINGS,
  ProductCategory,
} from "@/config/site";

interface ProductCategoriesSectionProps {
  onOpenEnquiry: (
    preselectedProduct?: string,
    mode?: "supply" | "buyback" | "reconditioning"
  ) => void;
}

const IBC_IMAGE_VIEWS = [
  {
    label: "Plastic Pallet IBC",
    src: "/images/products/ibc-plastic-pallet.png",
  },
  {
    label: "Steel Pallet IBC",
    src: "/images/products/ibc-steel-pallet.png",
  },
  {
    label: "Wood Pallet IBC",
    src: "/images/products/ibc-wood-pallet.png",
  },
];

const DRUM_IMAGE_VIEWS = [
  {
    label: "Tight & Open Head Pair",
    src: "/images/products/plastic-drums.png",
  },
  {
    label: "Tight Head (Closed)",
    src: "/images/products/plastic-drum-tight-head.png",
  },
  {
    label: "Open Top (Ring Lock)",
    src: "/images/products/plastic-drum-open-top.png",
  },
];

export default function ProductCategoriesSection({
  onOpenEnquiry,
}: ProductCategoriesSectionProps) {
  const [ibcViewIndex, setIbcViewIndex] = useState(0);
  const [drumViewIndex, setDrumViewIndex] = useState(0);
  const [selectedSpecModal, setSelectedSpecModal] =
    useState<ProductCategory | null>(null);

  return (
    <section
      id="product-categories"
      aria-labelledby="products-section-heading"
      className="py-16 sm:py-20 lg:py-24 bg-[#F5F5F3] bg-industrial-grid border-b border-[#E2E2DE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-[#E2E2DE] text-[#292B29] text-xs font-bold uppercase tracking-wider mb-3.5">
              <span className="w-2 h-2 rounded-full bg-[#F20D16]" />
              <span>Verified Product Range • Supply, Reconditioning &amp; Buyback</span>
            </div>
            <h2
              id="products-section-heading"
              className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-[#292B29] leading-[1.15]"
            >
              Industrial Packaging Containers{" "}
              <span className="text-[#1769AA]">Engineered for Reliability</span>
            </h2>
            <p className="mt-3.5 text-[16px] sm:text-[17px] text-[#3D3F3D] leading-relaxed">
              Every container supplied by Parth Packaging undergoes thorough
              residual decontamination, chemical washing, thermal drying, and
              stage-by-stage leak testing to meet demanding chemical and
              industrial standards.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center gap-2.5 bg-[#1769AA] hover:bg-[#115293] text-white font-semibold text-sm sm:text-[15px] px-5 py-3 rounded-md transition-colors cursor-pointer shadow-xs"
            >
              <ClipboardList className="w-4 h-4 text-white" />
              <span>Request Custom Bulk Specification</span>
            </button>
          </div>
        </div>

        {/* 2x2 High-Visibility Product Category Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PRODUCT_CATEGORIES.map((category, index) => {
            const isIbc = category.id === "reconditioning-ibc";
            const isDrum = category.id === "reconditioning-plastic-drums";

            const activeImgSrc = isIbc
              ? IBC_IMAGE_VIEWS[ibcViewIndex].src
              : isDrum
              ? DRUM_IMAGE_VIEWS[drumViewIndex].src
              : category.image;

            return (
              <article
                key={category.id}
                id={`product-${category.slug}`}
                className="group bg-white rounded-2xl border border-[#E2E2DE] hover:border-[#1769AA]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Top Meta Bar (Separated from product image so nothing obscures product) */}
                <div className="px-6 py-3.5 bg-[#FAFAFA] border-b border-[#E2E2DE] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#1769AA]">
                      CATEGORY 0{index + 1}
                    </span>
                    <span className="text-[#E2E2DE]">|</span>
                    <span className="text-xs font-semibold text-[#292B29]">
                      {category.compliance}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#292B29] bg-[#F5F5F3] px-2.5 py-1 rounded border border-[#E2E2DE]">
                    {category.capacityRange}
                  </span>
                </div>

                {/* Dedicated Full-Visibility Product Image Stage (100% object-contain, zero cropping) */}
                <div className="relative h-[270px] sm:h-[310px] w-full bg-white p-6 sm:p-8 flex items-center justify-center border-b border-[#E2E2DE]">
                  <img
                    src={activeImgSrc}
                    alt={category.name}
                    loading="lazy"
                    className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Optional Multi-Angle / Variant Image Switcher Bar for IBC & Plastic Drums */}
                {(isIbc || isDrum) && (
                  <div className="px-6 py-2.5 bg-[#F4F6F8] border-b border-[#E2E2DE] flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#747474]">
                      {isIbc ? "Select Pallet Base View:" : "Select Drum Configuration:"}
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {(isIbc ? IBC_IMAGE_VIEWS : DRUM_IMAGE_VIEWS).map(
                        (view, vIdx) => {
                          const isActiveView = isIbc
                            ? ibcViewIndex === vIdx
                            : drumViewIndex === vIdx;
                          return (
                            <button
                              key={view.label}
                              type="button"
                              onClick={() =>
                                isIbc
                                  ? setIbcViewIndex(vIdx)
                                  : setDrumViewIndex(vIdx)
                              }
                              className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-colors cursor-pointer ${
                                isActiveView
                                  ? "bg-[#1769AA] text-white shadow-xs"
                                  : "bg-white text-[#292B29] border border-[#E2E2DE] hover:border-[#1769AA]"
                              }`}
                            >
                              {view.label}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}

                {/* Product Content & Specifications */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#292B29] group-hover:text-[#1769AA] transition-colors">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-[#747474]">
                      {category.tagline}
                    </p>

                    <p className="mt-3.5 text-[15px] text-[#3D3F3D] leading-relaxed">
                      {category.description}
                    </p>

                    {/* Key Verified Features */}
                    <div className="mt-5 pt-4 border-t border-[#E2E2DE] grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {category.keyFeatures.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-2 text-xs sm:text-[13px] font-medium text-[#292B29]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer CTAs */}
                  <div className="mt-6 pt-5 border-t border-[#E2E2DE] flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedSpecModal(category)}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#1769AA] hover:text-white bg-[#EDF5FD] hover:bg-[#1769AA] px-4 py-2.5 rounded-md border border-[#1769AA]/30 transition-colors cursor-pointer shadow-xs"
                    >
                      <SlidersHorizontal className="w-4 h-4 text-[#1769AA] group-hover:text-white" />
                      <span>Explore Product Specs</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onOpenEnquiry(category.shortName, "supply")
                      }
                      className="inline-flex items-center gap-2 bg-[#F20D16] hover:bg-[#C80910] text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Enquire Now</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Extended Verified Product Portfolio Bar (All 12+ items from existing website) */}
        <div className="mt-12 bg-white rounded-2xl border border-[#E2E2DE] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#E2E2DE]">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#F20D16]" />
                <h3 className="text-lg sm:text-xl font-extrabold text-[#292B29]">
                  Complete Range of Products Offered (Supply &amp; Buyback)
                </h3>
              </div>
              <p className="text-sm text-[#5C5E5C] mt-1">
                Click any product specification below to open a pre-configured
                enquiry in our Packaging Requirement Studio:
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenEnquiry(undefined, "buyback")}
              className="self-start md:self-center inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F20D16] bg-[#FEF2F2] hover:bg-[#F20D16] hover:text-white px-4 py-2.5 rounded-md border border-[#F20D16]/30 transition-colors cursor-pointer shrink-0"
            >
              <span>Have Empty Drums or IBCs to Sell? Click Here →</span>
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {EXTENDED_PRODUCT_OFFERINGS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onOpenEnquiry(item, "supply")}
                className="group flex items-center justify-between gap-2 text-left px-3.5 py-2.5 rounded-lg bg-[#F5F5F3] hover:bg-[#1769AA] text-[#292B29] hover:text-white border border-[#E2E2DE] hover:border-[#1769AA] transition-colors cursor-pointer"
              >
                <span className="text-xs sm:text-[13px] font-semibold truncate">
                  {item}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F20D16] group-hover:text-white shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Specification Sheet Modal (For "Explore Product" on Homepage Phase 1) */}
      <AnimatePresence>
        {selectedSpecModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="spec-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl bg-white rounded-2xl border border-[#E2E2DE] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="px-6 py-4 bg-[#181A18] text-white flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#F20D16]" />
                  <h3 id="spec-modal-title" className="text-base sm:text-lg font-bold">
                    {selectedSpecModal.name} — Verified Specifications
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Close specification modal"
                  onClick={() => setSelectedSpecModal(null)}
                  className="w-8 h-8 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5 bg-[#F5F5F3] rounded-xl border border-[#E2E2DE] p-5 h-56 flex items-center justify-center">
                    <img
                      src={selectedSpecModal.image}
                      alt={selectedSpecModal.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="md:col-span-7 space-y-3">
                    <span className="inline-block text-xs font-mono font-bold text-[#F20D16] bg-[#FEF2F2] px-2.5 py-1 rounded border border-[#F20D16]/20">
                      {selectedSpecModal.capacityRange}
                    </span>
                    <p className="text-sm sm:text-[15px] text-[#292B29] leading-relaxed">
                      {selectedSpecModal.detailedDescription}
                    </p>
                    <div className="pt-2 text-xs text-[#5C5E5C]">
                      <strong>Construction / Material:</strong>{" "}
                      {selectedSpecModal.material}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#F5F5F3] rounded-xl p-4 border border-[#E2E2DE]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#292B29] mb-2.5">
                      Available Variants &amp; Options
                    </h4>
                    <ul className="space-y-2">
                      {selectedSpecModal.variants.map((v) => (
                        <li
                          key={v.name}
                          className="flex items-center justify-between text-xs bg-white px-3 py-2 rounded border border-[#E2E2DE]"
                        >
                          <span className="font-semibold text-[#292B29]">
                            {v.name}
                          </span>
                          <span className="font-mono text-[#747474]">
                            {v.spec}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#F5F5F3] rounded-xl p-4 border border-[#E2E2DE]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#292B29] mb-2.5">
                      Key Quality &amp; Design Features
                    </h4>
                    <ul className="space-y-2">
                      {selectedSpecModal.keyFeatures.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2 text-xs text-[#292B29] font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#F20D16] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-[#F5F5F3] border-t border-[#E2E2DE] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSpecModal(null)}
                  className="px-4 py-2.5 rounded-md border border-[#E2E2DE] bg-white text-xs font-semibold text-[#292B29] hover:bg-[#EBEBE7] cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const name = selectedSpecModal.shortName;
                    setSelectedSpecModal(null);
                    onOpenEnquiry(name, "supply");
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#F20D16] hover:bg-[#C80910] text-white text-xs font-semibold cursor-pointer"
                >
                  <span>Enquire for {selectedSpecModal.shortName}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
