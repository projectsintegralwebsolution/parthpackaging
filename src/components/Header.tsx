"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ArrowUpRight,
  ShieldCheck,
  Menu,
  X,
  CheckCircle2,
  ClipboardList,
  Layers,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SITE_CONFIG,
  PRODUCT_CATEGORIES,
  EXTENDED_PRODUCT_OFFERINGS,
  ProductCategory,
} from "@/config/site";

interface HeaderProps {
  onOpenEnquiry: (preselectedProduct?: string, mode?: "supply" | "buyback" | "reconditioning") => void;
}

export default function Header({ onOpenEnquiry }: HeaderProps) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(
    PRODUCT_CATEGORIES[0]
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsExpanded, setMobileProductsExpanded] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const triggerBtnRef = useRef<HTMLButtonElement>(null);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (megaMenuOpen) {
          setMegaMenuOpen(false);
          triggerBtnRef.current?.focus();
        }
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [megaMenuOpen, mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        megaMenuOpen &&
        megaMenuRef.current &&
        !megaMenuRef.current.contains(e.target as Node)
      ) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [megaMenuOpen]);

  const handleMouseEnterMega = () => {
    if (isNavigatingRef.current) return;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMegaMenuOpen(true);
  };

  const handleMouseLeaveMega = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 180);
  };

  const handleProductNavigation = (
    e: React.MouseEvent,
    href: string
  ) => {
    e.preventDefault();
    isNavigatingRef.current = true;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    triggerBtnRef.current?.blur();

    if (href.startsWith("#")) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      } else {
        window.location.hash = href;
      }
    } else {
      window.location.href = href;
    }

    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 500);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/98 backdrop-blur-md border-b border-[#E2E2DE] transition-shadow duration-300" style={{ boxShadow: isScrolled ? "0 8px 30px rgba(24, 26, 24, 0.06)" : "none" }}>
      {/* Slim Top Verified Information Bar in Industrial Blue-Slate */}
      <div className="bg-[#0D1F33] text-white/90 text-[12px] sm:text-[13px] border-b border-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-5 overflow-hidden">
            <span className="inline-flex items-center gap-1.5 font-medium text-white shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F20D16]" />
              <span>MPCB Approved Stockist &amp; Reconditioner</span>
            </span>
            <span className="hidden md:inline-block text-white/25">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-white/75 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#F20D16] shrink-0" />
              <span>MIDC Tarapur, Boisar, Dist. Palghar • Est. 1995</span>
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <a
              href={`mailto:${SITE_CONFIG.contact.primaryEmail}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#F20D16]" />
              <span>{SITE_CONFIG.contact.primaryEmail}</span>
            </a>
            <span className="hidden lg:inline-block text-white/25">|</span>
            <a
              href={SITE_CONFIG.contact.factoryPhoneHref}
              className="hidden lg:inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F20D16]" />
              <span>Factory: {SITE_CONFIG.contact.factoryPhone}</span>
            </a>
            <a
              href={SITE_CONFIG.contact.primaryMobileHref}
              className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-[#F20D16] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F20D16]" />
              <span>{SITE_CONFIG.contact.primaryMobile}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-[86px] gap-4">
          {/* Actual Supplied Parth Packaging Logo */}
          <a
            href="/"
            aria-label="Parth Packaging Home"
            className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F20D16] rounded"
          >
            <Image
              src={SITE_CONFIG.logos.primary}
              alt={SITE_CONFIG.logos.alt}
              width={SITE_CONFIG.logos.width}
              height={SITE_CONFIG.logos.height}
              priority
              className="h-10 sm:h-12 lg:h-[52px] w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {SITE_CONFIG.navigation.map((item) => {
              if (item.hasMegaMenu) {
                return (
                  <div
                    key={item.label}
                    ref={megaMenuRef}
                    className="relative"
                    onMouseEnter={handleMouseEnterMega}
                    onMouseLeave={handleMouseLeaveMega}
                  >
                    <button
                      ref={triggerBtnRef}
                      type="button"
                      aria-expanded={megaMenuOpen}
                      aria-haspopup="true"
                      aria-controls="products-mega-menu"
                      onClick={() => setMegaMenuOpen((prev) => !prev)}
                      className={`group inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-md text-[15px] font-semibold transition-all cursor-pointer ${
                        megaMenuOpen
                          ? "text-[#F20D16] bg-[#FEF2F2]"
                          : "text-[#292B29] hover:text-[#F20D16] hover:bg-[#F5F5F3]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          megaMenuOpen ? "rotate-180 text-[#F20D16]" : "text-[#747474]"
                        }`}
                      />
                    </button>

                    {/* Invisible hover bridge so pointer movement never drops menu */}
                    {megaMenuOpen && (
                      <div
                        aria-hidden="true"
                        className="fixed left-0 right-0 h-5 z-40"
                      />
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3.5 py-2.5 rounded-md text-[15px] font-semibold text-[#292B29] hover:text-[#F20D16] hover:bg-[#F5F5F3] transition-colors"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Area: Enquiry CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenEnquiry()}
              className="hidden sm:inline-flex items-center gap-2.5 bg-[#F20D16] hover:bg-[#C80910] active:bg-[#A8070D] text-white font-semibold text-[14px] lg:text-[15px] px-4 lg:px-5 py-2.5 lg:py-3 rounded-md shadow-sm hover:shadow transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#F20D16]"
            >
              <ClipboardList className="w-4 h-4" />
              <span>Requirement Studio</span>
              <ArrowUpRight className="w-4 h-4 opacity-90" />
            </button>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-[#E2E2DE] text-[#292B29] hover:bg-[#F5F5F3] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Premium Mega Menu Panel - Compact Height & Click-to-Close */}
      <AnimatePresence>
        {megaMenuOpen && (
          <motion.div
            id="products-mega-menu"
            role="region"
            aria-label="Parth Packaging Product Categories"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            onMouseEnter={handleMouseEnterMega}
            onMouseLeave={handleMouseLeaveMega}
            className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b-2 border-[#1769AA] shadow-[0_20px_40px_rgba(15,30,46,0.12)] z-50"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-[21px]">
              <div className="grid grid-cols-12 gap-6 items-stretch">
                {/* Left Column: 4 Core Verified Product Categories */}
                <div className="col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E2E2DE]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#1769AA]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#5C5E5C]">
                          Core Reconditioned Packaging Range
                        </span>
                      </div>
                      <a
                        href="#product-categories"
                        onClick={(e) => handleProductNavigation(e, "#product-categories")}
                        className="text-xs font-semibold text-[#1769AA] hover:text-[#115293] hover:underline inline-flex items-center gap-1"
                      >
                        View All Categories
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {PRODUCT_CATEGORIES.map((cat) => {
                        const isSelected = activeCategory.id === cat.id;
                        return (
                          <div
                            key={cat.id}
                            onMouseEnter={() => setActiveCategory(cat)}
                            onFocus={() => setActiveCategory(cat)}
                            onClick={(e) => handleProductNavigation(e, cat.href)}
                            className={`group relative flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#EDF5FD] border-[#1769AA] shadow-xs"
                                : "bg-white border-[#E2E2DE] hover:border-[#1769AA]/50 hover:bg-[#F4F6F8]"
                            }`}
                          >
                            {/* Isolated Product Thumbnail */}
                            <div className="w-12 h-12 rounded-md bg-white border border-[#E2E2DE] p-1 flex items-center justify-center shrink-0">
                              <img
                                src={cat.image}
                                alt={cat.shortName}
                                className="w-full h-full object-contain"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <a
                                  href={cat.href}
                                  onClick={(e) => handleProductNavigation(e, cat.href)}
                                  className="text-[13px] font-bold text-[#292B29] group-hover:text-[#1769AA] transition-colors leading-snug"
                                >
                                  {cat.shortName}
                                </a>
                              </div>
                              <p className="text-[11.5px] text-[#747474] mt-0.5 line-clamp-1 leading-normal">
                                {cat.tagline}
                              </p>
                              <span className="inline-block mt-1 text-[10.5px] font-mono font-medium text-[#292B29] bg-white px-1.5 py-0.5 rounded border border-[#E2E2DE]">
                                {cat.capacityRange}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom Extended Supply & Buyback Bar */}
                  <div className="mt-3 pt-2.5 border-t border-[#E2E2DE] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-[11.5px] text-[#292B29]">
                      <Layers className="w-3.5 h-3.5 text-[#1769AA] shrink-0" />
                      <span>
                        <strong>Also Dealing In:</strong> Used M.S. Steel Drums, SS Drums, HM-HDPE Drums, PVC Drums (200L), Composite Drums &amp; MT Tanks (1000L).
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Featured / Active Product Spotlight */}
                <div className="col-span-5 bg-[#F4F6F8] rounded-xl border border-[#E2E2DE] p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-[#1769AA] bg-white px-2 py-0.5 rounded border border-[#1769AA]/20">
                        {activeCategory.compliance}
                      </span>
                      <span className="text-[11px] font-mono font-semibold text-[#292B29]">
                        {activeCategory.capacityRange}
                      </span>
                    </div>

                    {/* Compact Product Preview */}
                    <div
                      onClick={(e) => handleProductNavigation(e, activeCategory.href)}
                      className="relative h-32 w-full bg-white rounded-lg border border-[#E2E2DE] p-2 flex items-center justify-center my-2 cursor-pointer hover:border-[#1769AA] transition-colors"
                    >
                      <img
                        src={activeCategory.image}
                        alt={activeCategory.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>

                    <h3
                      onClick={(e) => handleProductNavigation(e, activeCategory.href)}
                      className="text-[15px] font-bold text-[#292B29] hover:text-[#1769AA] transition-colors cursor-pointer leading-snug"
                    >
                      {activeCategory.name}
                    </h3>
                    <p className="text-[11.5px] text-[#5C5E5C] mt-1 line-clamp-2 leading-relaxed">
                      {activeCategory.description}
                    </p>

                    <ul className="mt-2.5 grid grid-cols-2 gap-1">
                      {activeCategory.keyFeatures.slice(0, 4).map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-1 text-[11px] text-[#292B29] font-medium"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#1769AA] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-[#E2E2DE] flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setMegaMenuOpen(false);
                        onOpenEnquiry(activeCategory.shortName, "supply");
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#F20D16] hover:bg-[#C80910] text-white text-xs font-semibold py-2 px-3.5 rounded-md transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Enquire for {activeCategory.shortName}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={activeCategory.href}
                      onClick={(e) => handleProductNavigation(e, activeCategory.href)}
                      className="inline-flex items-center justify-center text-xs font-semibold text-[#1769AA] hover:text-white hover:bg-[#1769AA] bg-white border border-[#1769AA]/30 py-2 px-3 rounded-md transition-colors cursor-pointer"
                    >
                      Specifications
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden bg-white border-b border-[#E2E2DE] overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2 max-h-[82vh] overflow-y-auto">
              {SITE_CONFIG.navigation.map((item) => {
                if (item.hasMegaMenu) {
                  return (
                    <div
                      key={item.label}
                      className="border border-[#E2E2DE] rounded-lg overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setMobileProductsExpanded((prev) => !prev)
                        }
                        className="w-full flex items-center justify-between px-4 py-3 text-left text-[15px] font-bold text-[#292B29] bg-[#F5F5F3]"
                      >
                        <span>Products Range</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobileProductsExpanded ? "rotate-180 text-[#F20D16]" : ""
                          }`}
                        />
                      </button>

                      {mobileProductsExpanded && (
                        <div className="p-3 bg-white divide-y divide-[#E2E2DE]">
                          {PRODUCT_CATEGORIES.map((cat) => (
                            <div
                              key={cat.id}
                              className="py-3 first:pt-1 last:pb-1 flex items-center gap-3"
                            >
                              <div
                                onClick={(e) => handleProductNavigation(e, cat.href)}
                                className="w-14 h-14 rounded bg-[#F5F5F3] border border-[#E2E2DE] p-1.5 flex items-center justify-center shrink-0 cursor-pointer"
                              >
                                <img
                                  src={cat.image}
                                  alt={cat.shortName}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <a
                                  href={cat.href}
                                  onClick={(e) => handleProductNavigation(e, cat.href)}
                                  className="block text-sm font-bold text-[#292B29] hover:text-[#1769AA]"
                                >
                                  {cat.shortName}
                                </a>
                                <p className="text-xs text-[#747474] truncate">
                                  {cat.capacityRange}
                                </p>
                                <div className="mt-1.5 flex items-center gap-3">
                                  <a
                                    href={cat.href}
                                    onClick={(e) => handleProductNavigation(e, cat.href)}
                                    className="text-xs font-semibold text-[#1769AA] underline"
                                  >
                                    View Specs
                                  </a>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      onOpenEnquiry(cat.shortName, "supply");
                                    }}
                                    className="text-xs font-semibold text-[#F20D16]"
                                  >
                                    Request Quote →
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="pt-3 mt-2">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#747474] mb-1.5">
                              Extended Container Range:
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {EXTENDED_PRODUCT_OFFERINGS.slice(4, 10).map((item) => (
                                <span
                                  key={item}
                                  className="text-[11px] bg-[#F5F5F3] text-[#292B29] px-2 py-0.5 rounded border border-[#E2E2DE]"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-md text-[15px] font-semibold text-[#292B29] hover:bg-[#F5F5F3]"
                  >
                    {item.label}
                  </a>
                );
              })}

              <div className="pt-3 border-t border-[#E2E2DE] flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquiry();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#F20D16] text-white font-semibold text-sm py-3 px-4 rounded-md shadow-xs"
                >
                  <ClipboardList className="w-4 h-4" />
                  <span>Open Packaging Requirement Studio</span>
                </button>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href={SITE_CONFIG.contact.primaryMobileHref}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded border border-[#E2E2DE] font-semibold text-[#292B29] bg-[#F5F5F3]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#F20D16]" />
                    <span>{SITE_CONFIG.contact.primaryMobile}</span>
                  </a>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.primaryEmail}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded border border-[#E2E2DE] font-semibold text-[#292B29] bg-[#F5F5F3] truncate"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#F20D16] shrink-0" />
                    <span className="truncate">Email Us</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
