"use client";

import React from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { SITE_CONFIG, PRODUCT_CATEGORIES } from "@/config/site";
import { InquiryMode } from "./PackagingRequirementStudio";

interface FooterProps {
  onOpenEnquiry: (preselectedProduct?: string, mode?: InquiryMode) => void;
}

export default function Footer({ onOpenEnquiry }: FooterProps) {
  return (
    <footer
      id="footer-contact"
      aria-label="Site Footer and Verified Contact Information"
      className="bg-[#0A1622] text-white/85 border-t border-[#1E3A5F]"
    >
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Actual Supplied Logo & Verified Company Introduction */}
          <div className="lg:col-span-4 space-y-5">
            {/* Actual Supplied Logo presented on a crisp white brand plate so it is never recoloured, cropped, or distorted */}
            <a
              href="/"
              aria-label="Parth Packaging Home"
              className="inline-block bg-white px-4 py-2.5 rounded-lg border border-white/20 shadow-xs"
            >
              <Image
                src={SITE_CONFIG.logos.primary}
                alt={SITE_CONFIG.logos.alt}
                width={SITE_CONFIG.logos.width}
                height={SITE_CONFIG.logos.height}
                className="h-10 w-auto object-contain"
              />
            </a>

            <p className="text-sm text-white/75 leading-relaxed">
              <strong>Parth Packaging</strong> is an MPCB approved Stockist &amp;
              Reconditioner established in 1995 in MIDC Tarapur, Boisar. We are
              engaged in buying, reconditioning, and supplying Used Plastic
              Drums, Intermediate Bulk Containers (IBC), Fiber Drums, Steel
              Barrels, and HM-HDPE Carboys across Maharashtra, Gujarat, and all
              over India.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/8 border border-white/12 text-xs font-semibold text-white">
              <ShieldCheck className="w-4 h-4 text-[#1769AA] shrink-0" />
              <span>MPCB Approved Stockist &amp; Reconditioner (Est. 1995)</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1769AA]" />
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SITE_CONFIG.navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-white/75 hover:text-white hover:translate-x-0.5 inline-flex items-center gap-1 transition-all"
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => onOpenEnquiry()}
                  className="text-blue-300 hover:text-white font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Requirement Studio</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Verified Product Category Links */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1769AA]" />
              Our Products
            </h3>
            <ul className="space-y-2.5 text-sm">
              {PRODUCT_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={cat.href}
                    className="text-white/75 hover:text-white transition-colors block"
                  >
                    {cat.shortName}
                    <span className="block text-[11px] font-mono text-white/45">
                      {cat.capacityRange}
                    </span>
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <button
                  type="button"
                  onClick={() => onOpenEnquiry(undefined, "buyback")}
                  className="text-xs font-semibold text-blue-300 hover:text-white underline cursor-pointer"
                >
                  Sell Used Empty Drums / IBCs →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Contact Address, Phones & Emails */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1769AA]" />
              Verified Contact &amp; Factory
            </h3>

            <address className="not-italic text-sm text-white/80 space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F20D16] shrink-0 mt-1" />
                <span className="leading-relaxed">
                  <strong className="text-white block">Parth Packaging</strong>
                  {SITE_CONFIG.contact.address.line1}{" "}
                  {SITE_CONFIG.contact.address.line2}{" "}
                  {SITE_CONFIG.contact.address.line3}{" "}
                  {SITE_CONFIG.contact.address.city},{" "}
                  {SITE_CONFIG.contact.address.district},{" "}
                  {SITE_CONFIG.contact.address.state},{" "}
                  {SITE_CONFIG.contact.address.country}.
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                <a
                  href={SITE_CONFIG.contact.factoryPhoneHref}
                  className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#1769AA] shrink-0" />
                  <span>Factory: {SITE_CONFIG.contact.factoryPhone}</span>
                </a>
                <a
                  href={SITE_CONFIG.contact.primaryMobileHref}
                  className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#1769AA] shrink-0" />
                  <span>Mobile: {SITE_CONFIG.contact.primaryMobile}</span>
                </a>
                <a
                  href={SITE_CONFIG.contact.secondaryMobileHref}
                  className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#1769AA] shrink-0" />
                  <span>Mobile: {SITE_CONFIG.contact.secondaryMobile}</span>
                </a>
              </div>

              <div className="space-y-1.5 pt-1">
                <a
                  href={`mailto:${SITE_CONFIG.contact.primaryEmail}`}
                  className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#1769AA] shrink-0" />
                  <span>{SITE_CONFIG.contact.primaryEmail}</span>
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.contact.secondaryEmail}`}
                  className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#1769AA] shrink-0" />
                  <span>{SITE_CONFIG.contact.secondaryEmail}</span>
                </a>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Developer Credit Bar */}
      <div className="border-t border-white/10 bg-[#060D15]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>
            Copyright © {new Date().getFullYear()} Parth Packaging. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1">
            <span>Developed by</span>
            <a
              href={SITE_CONFIG.developerCredit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/85 hover:text-[#F20D16] font-medium underline underline-offset-4 transition-colors"
            >
              {SITE_CONFIG.developerCredit.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
