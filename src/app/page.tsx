"use client";

import React, { useState, useCallback } from "react";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import CompanyIntroduction from "@/components/CompanyIntroduction";
import ProductCategoriesSection from "@/components/ProductCategoriesSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ApplicationsSection from "@/components/ApplicationsSection";
import QualityCapabilitiesSection from "@/components/QualityCapabilitiesSection";
import StudioPreviewSection from "@/components/StudioPreviewSection";
import FinalCtaBanner from "@/components/FinalCtaBanner";
import Footer from "@/components/Footer";
import PackagingRequirementStudio, {
  InquiryMode,
} from "@/components/PackagingRequirementStudio";
import FloatingUtilities from "@/components/FloatingUtilities";

export default function HomePage() {
  const [studioOpen, setStudioOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(
    undefined
  );
  const [selectedMode, setSelectedMode] = useState<InquiryMode>("supply");

  const handleOpenEnquiry = useCallback(
    (product?: string, mode: InquiryMode = "supply") => {
      if (product) {
        setSelectedProduct(product);
      }
      setSelectedMode(mode);
      setStudioOpen(true);
    },
    []
  );

  const handleCloseEnquiry = useCallback(() => {
    setStudioOpen(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#292B29]">
      {/* Skip to Main Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[#F20D16] focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Header & Premium Mega Menu */}
      <Header onOpenEnquiry={handleOpenEnquiry} />

      {/* Main Homepage Content in Exact Specified Order */}
      <main id="main-content" className="flex-1">
        {/* Section 1: Hero Slider */}
        <HeroSlider onOpenEnquiry={handleOpenEnquiry} />

        {/* Section 2: Company Introduction */}
        <CompanyIntroduction onOpenEnquiry={handleOpenEnquiry} />

        {/* Section 3: Product Categories */}
        <ProductCategoriesSection onOpenEnquiry={handleOpenEnquiry} />

        {/* Section 4: Why Choose Parth Packaging? */}
        <WhyChooseSection onOpenEnquiry={handleOpenEnquiry} />

        {/* Section 5: Packaging Applications or Industries Served */}
        <ApplicationsSection onOpenEnquiry={handleOpenEnquiry} />

        {/* Section 6: Quality, Manufacturing or Capabilities */}
        <QualityCapabilitiesSection />

        {/* Section 7: Distinctive Enquiry Experience (Interactive Packaging Requirement Studio) */}
        <StudioPreviewSection onOpenEnquiry={handleOpenEnquiry} />

        {/* Section 8: Final CTA Banner */}
        <FinalCtaBanner onOpenEnquiry={handleOpenEnquiry} />
      </main>

      {/* Section 9: Branded Footer */}
      <Footer onOpenEnquiry={handleOpenEnquiry} />

      {/* Slide-Over Packaging Requirement Studio Drawer */}
      <PackagingRequirementStudio
        isOpen={studioOpen}
        onClose={handleCloseEnquiry}
        initialProduct={selectedProduct}
        initialMode={selectedMode}
      />

      {/* Floating WhatsApp Contact Button & Back-to-Top Button */}
      <FloatingUtilities />
    </div>
  );
}
