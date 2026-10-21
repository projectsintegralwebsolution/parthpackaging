"use client";

import React from "react";
import {
  ShieldCheck,
  Recycle,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Building2,
} from "lucide-react";

interface CompanyIntroductionProps {
  onOpenEnquiry: (
    preselectedProduct?: string,
    mode?: "supply" | "buyback" | "reconditioning"
  ) => void;
}

export default function CompanyIntroduction({
  onOpenEnquiry,
}: CompanyIntroductionProps) {
  return (
    <section
      id="company-introduction"
      aria-labelledby="company-intro-heading"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E2E2DE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Verified Company Narrative */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F5F5F3] border border-[#E2E2DE] text-[#292B29] text-xs font-bold uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5 text-[#F20D16]" />
              <span>About Parth Packaging • Established 1995</span>
            </div>

            <h2
              id="company-intro-heading"
              className="text-[28px] sm:text-[34px] lg:text-[40px] font-extrabold text-[#292B29] leading-[1.18]"
            >
              MPCB Approved Stockist &amp; Reconditioner of{" "}
              <span className="text-[#F20D16]">
                Industrial Bulk Containers &amp; Drums
              </span>
            </h2>

            {/* Highlighted Verified Operations Statement */}
            <div className="mt-5 pl-4 border-l-4 border-[#F20D16] bg-[#F5F5F3] py-3 pr-4 rounded-r-lg">
              <p className="text-sm sm:text-[15px] font-semibold text-[#292B29] leading-relaxed">
                “Cleaning, repairing, reconditioning, recycling &amp; washing of
                IBCs, barrels, plastic drums, fiber drums, carboys &amp; other
                industrial packing materials.”
              </p>
            </div>

            <p className="mt-5 text-[16px] sm:text-[17px] text-[#3D3F3D] leading-relaxed">
              <strong>Parth Packaging</strong> is an{" "}
              <strong>MPCB (Maharashtra Pollution Control Board) approved</strong>{" "}
              Stockist and Reconditioner that started its first unit in{" "}
              <strong>1995 in MIDC Tarapur, Boisar</strong>. We are engaged in
              buying, reconditioning, and supplying a comprehensive range of used
              and reconditioned Plastic Drums, Intermediate Bulk Containers (IBCs),
              Fiber Drums, and Carboys.
            </p>

            <p className="mt-3.5 text-[16px] sm:text-[17px] text-[#3D3F3D] leading-relaxed">
              Our industrial portfolio comprises Plastic Barrels, Steel Drums,
              Used M.S. Barrels of every type, Used HM-HDPE Carboys (20 Ltr. to
              100 Ltr.), Closed Head &amp; Open Mouth Plastic Drums, 200 Ltr. PVC
              Drums, Composite Drums, and 1000 Ltr. MT Tanks—serving chemical,
              pharmaceutical, oil, and manufacturing plants across{" "}
              <strong>
                Boisar, Palghar, Dahanu, Vasai, Mumbai, Maharashtra, Vapi,
                Valsad, Gujarat, and all over India
              </strong>
              .
            </p>

            {/* Verified Operational Pillars */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "MPCB Authorized Decontamination & ETP",
                "ISI Standard Compliant HDPE Drums",
                "Supplier & Buyer of Empty Containers",
                "Ready Stock for Bulk Industrial Orders",
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2.5 text-sm font-semibold text-[#292B29]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#F20D16] shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#quality-capabilities"
                className="inline-flex items-center gap-2 bg-[#292B29] hover:bg-[#181A18] text-white font-semibold text-[15px] px-6 py-3.5 rounded-md transition-colors"
              >
                <span>Explore Company Profile &amp; Quality Policy</span>
                <ArrowRight className="w-4 h-4 text-[#F20D16]" />
              </a>

              <button
                type="button"
                onClick={() => onOpenEnquiry(undefined, "buyback")}
                className="inline-flex items-center gap-2 bg-[#F5F5F3] hover:bg-[#EBEBE7] text-[#292B29] border border-[#E2E2DE] font-semibold text-[15px] px-5 py-3.5 rounded-md transition-colors cursor-pointer"
              >
                <Recycle className="w-4 h-4 text-[#F20D16]" />
                <span>Sell / Recondition Empty Drums</span>
              </button>
            </div>
          </div>

          {/* Right Column: Split Visual Composition (Facility + Genuine Product Matrix) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl bg-[#F5F5F3] border border-[#E2E2DE] p-4 sm:p-6 shadow-sm">
              {/* Primary Warehouse Facility Image */}
              <div className="relative rounded-xl overflow-hidden border border-[#E2E2DE] aspect-16/10 bg-[#181A18]">
                <img
                  src="/images/facility/warehouse-ibc-drums.jpg"
                  alt="Parth Packaging segregated industrial warehousing of reconditioned IBCs and blue HDPE plastic drums"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181A18]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 text-white">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#181A18]/90 backdrop-blur-xs px-3 py-1.5 rounded border border-white/15">
                    <MapPin className="w-3.5 h-3.5 text-[#F20D16]" />
                    Plot No. 29, Sonal Compound, M.I.D.C. Tarapur, Boisar
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold bg-[#F20D16] px-2.5 py-1 rounded">
                    Since 1995
                  </span>
                </div>
              </div>

              {/* Bottom 3-Column Verified Credential & Product Mini-Showcase */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-xl border border-[#E2E2DE] p-3.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase text-[#747474] font-semibold">
                      Origin
                    </span>
                    <ShieldCheck className="w-4 h-4 text-[#F20D16]" />
                  </div>
                  <div className="mt-2">
                    <p className="text-lg font-extrabold text-[#292B29]">
                      1995
                    </p>
                    <p className="text-xs text-[#5C5E5C] mt-0.5">
                      First Unit Started in MIDC Tarapur
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E2E2DE] p-3.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase text-[#747474] font-semibold">
                      Authorization
                    </span>
                    <Recycle className="w-4 h-4 text-[#F20D16]" />
                  </div>
                  <div className="mt-2">
                    <p className="text-lg font-extrabold text-[#292B29]">
                      MPCB
                    </p>
                    <p className="text-xs text-[#5C5E5C] mt-0.5">
                      Approved Stockist &amp; Reconditioner
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E2E2DE] p-3.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase text-[#747474] font-semibold">
                      Supply Network
                    </span>
                    <MapPin className="w-4 h-4 text-[#F20D16]" />
                  </div>
                  <div className="mt-2">
                    <p className="text-base font-extrabold text-[#292B29] leading-tight">
                      MH, GJ &amp; India
                    </p>
                    <p className="text-xs text-[#5C5E5C] mt-0.5">
                      Boisar, Mumbai, Vapi, Valsad &amp; Pan-India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
