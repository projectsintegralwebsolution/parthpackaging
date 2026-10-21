"use client";

import React from "react";
import {
  FlaskConical,
  Fuel,
  Layers,
  Wrench,
  Recycle,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { PACKAGING_APPLICATIONS } from "@/config/site";

interface ApplicationsSectionProps {
  onOpenEnquiry: (
    preselectedProduct?: string,
    mode?: "supply" | "buyback" | "reconditioning"
  ) => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FlaskConical,
  Fuel,
  Layers,
  Wrench,
  Recycle,
};

const APPLICATION_IMAGES: Record<string, string> = {
  "hazardous-chemicals": "/images/products/ibc-plastic-pallet.png",
  "oils-lubricants": "/images/products/plastic-drums.png",
  "powders-pastes-solids": "/images/products/fiber-drums.png",
  "welding-wire-specialty": "/images/products/carboys-assortment.png",
  "empty-drum-buyback": "/images/products/ibc-steel-pallet.png",
};

export default function ApplicationsSection({
  onOpenEnquiry,
}: ApplicationsSectionProps) {
  return (
    <section
      aria-labelledby="applications-heading"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E2E2DE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F5F5F3] border border-[#E2E2DE] text-[#292B29] text-xs font-bold uppercase tracking-wider mb-3.5">
            <span className="w-2 h-2 rounded-full bg-[#F20D16]" />
            <span>Verified Industrial Applications &amp; Sectors Served</span>
          </div>
          <h2
            id="applications-heading"
            className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-[#292B29] leading-[1.15]"
          >
            Built for Demanding{" "}
            <span className="text-[#F20D16]">
              Chemical, Liquid &amp; Bulk Solids Applications
            </span>
          </h2>
          <p className="mt-3.5 text-[16px] sm:text-[17px] text-[#3D3F3D] leading-relaxed">
            Our reconditioned IBCs, ISI-compliant HDPE plastic drums, carboys,
            and kraft fiber drums are engineered to safely store and transport a
            wide spectrum of industrial substances.
          </p>
        </div>

        {/* Applications Grid: 3 Top Cards + 2 Bottom Wide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {PACKAGING_APPLICATIONS.map((app, index) => {
            const IconComponent = ICON_MAP[app.iconName] || FlaskConical;
            const colSpanClass =
              index < 3 ? "lg:col-span-2" : "lg:col-span-3";
            const isBuyback = app.id === "empty-drum-buyback";
            const imgSrc =
              APPLICATION_IMAGES[app.id] ||
              "/images/products/ibc-plastic-pallet.png";

            return (
              <div
                key={app.id}
                className={`${colSpanClass} group rounded-2xl border ${
                  isBuyback
                    ? "bg-[#FEF2F2]/50 border-[#F20D16]/30 hover:border-[#F20D16]"
                    : "bg-[#F5F5F3] border-[#E2E2DE] hover:border-[#292B29]/40"
                } p-6 flex flex-col justify-between transition-all duration-300`}
              >
                <div>
                  {/* Top Row: Icon + Product Thumbnail Preview */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isBuyback
                          ? "bg-[#F20D16] text-white"
                          : "bg-white border border-[#E2E2DE] text-[#F20D16]"
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="w-20 h-16 rounded-lg bg-white border border-[#E2E2DE] p-1.5 flex items-center justify-center shrink-0">
                      <img
                        src={imgSrc}
                        alt={app.title}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>

                  <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-[#F20D16] mb-1.5">
                    {app.categoryTag}
                  </span>

                  <h3 className="text-lg sm:text-xl font-extrabold text-[#292B29]">
                    {app.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-[#3D3F3D] leading-relaxed">
                    {app.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E2E2DE]">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#747474] mb-2">
                    Matching Containers:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {app.recommendedProducts.map((prod) => (
                      <span
                        key={prod}
                        className="inline-flex items-center gap-1 text-xs font-semibold bg-white text-[#292B29] px-2.5 py-1 rounded border border-[#E2E2DE]"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#F20D16]" />
                        {prod}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenEnquiry(
                        app.recommendedProducts[0],
                        isBuyback ? "buyback" : "supply"
                      )
                    }
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#292B29] group-hover:text-[#F20D16] transition-colors cursor-pointer"
                  >
                    <span>
                      {isBuyback
                        ? "Schedule Empty Container Buyback / Reconditioning"
                        : `Enquire for ${app.title}`}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#F20D16]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
