"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ClipboardList,
  ShieldCheck,
  CheckCircle2,
  Pause,
  Play,
} from "lucide-react";
import { HERO_SLIDES } from "@/config/site";

interface HeroSliderProps {
  onOpenEnquiry: (
    preselectedProduct?: string,
    mode?: "supply" | "buyback" | "reconditioning"
  ) => void;
}

const SLIDE_INTERVAL_MS = 3500;

export default function HeroSlider({ onOpenEnquiry }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideCount = HERO_SLIDES.length;
  const activeSlide = HERO_SLIDES[currentIndex];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, currentIndex]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Parth Packaging Featured Industrial Packaging Solutions"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full bg-[#0D1F33] text-white overflow-hidden border-b border-[#1E3A5F]"
    >
      {/* Background Facility Photograph with 50% Black Overlay */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.bgImage}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={activeSlide.bgImage}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-center opacity-70"
            />
          </motion.div>
        </AnimatePresence>
        {/* Calibrated 50% semi-transparent black overlay as requested */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/50"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-industrial-grid-dark opacity-35"
        />
      </div>

      {/* Main Hero Container — Locked Equal Height Across All Slides */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-6 lg:py-7 xl:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[380px] lg:h-[330px]">
          {/* Left Column: Structured Industrial Narrative & Dual CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-full flex flex-col justify-center"
              >
                {/* Verified MPCB / Standard Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-[12.5px] font-semibold tracking-wide mb-2.5 sm:mb-3.5 self-start">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F20D16] shrink-0" />
                  <span>{activeSlide.badge}</span>
                </div>

                {/* Single Primary H1 with Consistent Equal-Height Floor */}
                <h1 className="text-[26px] sm:text-[34px] lg:text-[40px] xl:text-[42px] font-extrabold tracking-tight text-white leading-[1.14] min-h-[64px] sm:min-h-[82px] lg:min-h-[92px] flex flex-col justify-center">
                  <span>{activeSlide.headline}</span>
                  <span className="block text-[#F20D16] mt-0.5 sm:mt-1">
                    {activeSlide.highlightText}
                  </span>
                </h1>

                {/* Subtext with Equal-Height Floor */}
                <p className="mt-3 text-sm sm:text-[15px] text-white/90 max-w-2xl leading-relaxed font-normal min-h-[44px] sm:min-h-[48px] lg:min-h-[50px] flex items-center">
                  {activeSlide.description}
                </p>

                {/* Primary Red & Secondary Blue CTAs */}
                <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4">
                  <a
                    href={activeSlide.primaryCta.href}
                    className="inline-flex items-center justify-center gap-2 bg-[#F20D16] hover:bg-[#C80910] text-white font-semibold text-[14px] sm:text-[14.5px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-md shadow-lg shadow-[#F20D16]/25 transition-all"
                  >
                    <span>{activeSlide.primaryCta.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenEnquiry(activeSlide.secondaryCta.productPreselect, "supply")
                    }
                    className="inline-flex items-center justify-center gap-2 bg-[#1769AA] hover:bg-[#13568C] text-white border border-[#1769AA]/60 font-semibold text-[14px] sm:text-[14.5px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-md shadow-sm transition-all cursor-pointer"
                  >
                    <ClipboardList className="w-4 h-4 text-white" />
                    <span>{activeSlide.secondaryCta.label}</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: High-Visibility Uncropped Product Showcase Pod with Fixed Height */}
          <div className="lg:col-span-5 flex items-center justify-center h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.productImage}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full"
              >
                <div className="relative rounded-2xl bg-[#F4F6F8] border border-white/30 shadow-2xl p-4 sm:p-5 text-[#292B29] h-[270px] sm:h-[285px] lg:h-[290px] flex flex-col justify-between">
                  {/* Top Studio Header Bar inside Product Pod */}
                  <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#E2E2DE]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1769AA]" />
                      <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#292B29]">
                        Verified Specimen
                      </span>
                    </div>
                    <span className="text-[10.5px] font-mono font-semibold text-[#1769AA] bg-white px-2 py-0.5 rounded border border-[#E2E2DE]">
                      Slide 0{currentIndex + 1} / 0{slideCount}
                    </span>
                  </div>

                  {/* Product Image Container — 100% Visible with object-contain */}
                  <div className="relative h-[170px] sm:h-[190px] lg:h-[195px] w-full bg-white rounded-xl border border-[#E2E2DE] p-3 sm:p-4 flex items-center justify-center">
                    <img
                      src={activeSlide.productImage}
                      alt={activeSlide.productImageAlt}
                      className="max-h-full max-w-full w-auto h-auto object-contain select-none"
                    />
                  </div>

                  {/* Bottom Caption & Direct Action */}
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#292B29]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1769AA] shrink-0" />
                      <span>Supply, Reconditioning &amp; Buyback</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenEnquiry(
                          activeSlide.secondaryCta.productPreselect,
                          "supply"
                        )
                      }
                      className="text-[11px] font-bold text-[#F20D16] hover:underline shrink-0 cursor-pointer"
                    >
                      Inquire Now →
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Slider Controls: Slide Tabs + Prev/Next Buttons + Pause Toggle */}
        <div className="mt-4 pt-3 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Interactive Slide Indicators / Category Tabs */}
          <div
            role="tablist"
            aria-label="Select Hero Slide"
            className="grid grid-cols-3 gap-2 sm:gap-3 w-full sm:w-auto flex-1 max-w-2xl"
          >
            {HERO_SLIDES.map((slide, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  role="tab"
                  type="button"
                  aria-selected={isCurrent}
                  aria-label={`Slide ${idx + 1}: ${slide.highlightText}`}
                  onClick={() => setCurrentIndex(idx)}
                  className={`group text-left p-2 sm:px-3 sm:py-2 rounded-lg border transition-all cursor-pointer ${
                    isCurrent
                      ? "bg-white/15 border-[#1769AA] text-white"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-[10.5px] font-mono font-bold text-[#1769AA]">
                      0{idx + 1}
                    </span>
                    {isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F20D16]" />
                    )}
                  </div>
                  <span className="block text-xs font-semibold truncate">
                    {slide.highlightText}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Prev / Next / Pause Controls */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? "Resume automatic slide rotation" : "Pause automatic slide rotation"}
              className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors cursor-pointer"
              title={isPaused ? "Resume slider" : "Pause slider"}
            >
              {isPaused ? (
                <Play className="w-4 h-4" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </button>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white/10 hover:bg-[#F20D16] border border-white/15 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white/10 hover:bg-[#F20D16] border border-white/15 text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
