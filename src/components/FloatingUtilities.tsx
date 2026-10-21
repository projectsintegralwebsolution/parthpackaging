"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE_CONFIG } from "@/config/site";

export default function FloatingUtilities() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 380);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappUrl = `https://wa.me/${
    SITE_CONFIG.contact.whatsappNumber
  }?text=${encodeURIComponent(SITE_CONFIG.contact.whatsappDefaultMessage)}`;

  return (
    <div
      aria-label="Floating Quick Actions"
      className="fixed bottom-[45px] right-5 z-30 flex flex-col items-end gap-3 pointer-events-none"
    >
      {/* Back-to-Top Button (Stacked cleanly above WhatsApp button so they never overlap) */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            className="pointer-events-auto group flex items-center gap-2 bg-[#292B29] hover:bg-[#F20D16] text-white border border-white/20 shadow-lg rounded-full p-3 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F20D16]"
          >
            <ArrowUp className="w-5 h-5" />
            <span className="sr-only">Return to top of page</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Official WhatsApp Contact Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with Parth Packaging on WhatsApp (${SITE_CONFIG.contact.whatsappDisplay})`}
        title="Chat with us on WhatsApp"
        className="pointer-events-auto group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-semibold text-xs sm:text-sm pl-3.5 pr-4 py-3 rounded-full shadow-xl border border-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
      >
        {/* Recognisable Official WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-5 h-5 fill-current shrink-0"
        >
          <path d="M12.031 2.01c-5.518 0-9.998 4.48-9.998 9.998 0 1.763.46 3.484 1.334 5.002L2 22l5.122-1.344a9.956 9.956 0 0 0 4.909 1.298h.004c5.517 0 9.997-4.48 9.997-9.998a9.963 9.963 0 0 0-2.927-7.07A9.96 9.96 0 0 0 12.031 2.01Zm5.847 14.279c-.246.693-1.433 1.326-1.988 1.409-.513.077-1.162.109-1.877-.118-.434-.137-.991-.321-1.703-.629-2.996-1.293-4.953-4.311-5.103-4.511-.149-.2-1.219-1.622-1.219-3.094 0-1.472.771-2.196 1.045-2.495.274-.3.597-.375.796-.375.199 0 .398.002.572.01.183.009.429-.07.671.512.249.599.846 2.071.92 2.221.075.15.125.324.025.524-.1.2-.15.324-.299.499-.149.175-.314.391-.448.524-.149.15-.305.312-.131.611.174.3.773 1.276 1.66 2.067 1.141 1.018 2.103 1.333 2.402 1.483.298.15.472.125.647-.075.174-.2.746-.873.945-1.173.199-.3.398-.249.672-.149.274.1 1.742.823 2.04.973.299.15.498.224.572.349.075.125.075.723-.171 1.416Z" />
        </svg>
        <span className="font-bold tracking-tight">Chat with us</span>
      </a>
    </div>
  );
}
