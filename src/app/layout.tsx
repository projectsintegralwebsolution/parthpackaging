import type { Metadata } from "next";
import { Manrope, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title:
    "Parth Packaging | MPCB Approved Reconditioner & Supplier of IBCs, Plastic Drums, Fiber Drums & Carboys",
  description:
    "Established in 1995 in MIDC Tarapur, Boisar, Parth Packaging is an MPCB approved stockist, reconditioner, supplier, and buyer of Reconditioned Intermediate Bulk Containers (IBC), Plastic Drums, Fiber Drums, and Carboys across Maharashtra, Gujarat, and India.",
  keywords: [
    "Reconditioning Intermediate Bulk Containers",
    "Reconditioning IBC",
    "Reconditioning Plastic Drums",
    "Reconditioning Carboys",
    "Fiber Drums",
    "Used Plastic Drums Boisar",
    "MPCB Approved Drum Reconditioner",
    "MIDC Tarapur Packaging Supplier",
    "Parth Packaging",
  ],
  authors: [{ name: "Parth Packaging" }],
  alternates: {
    canonical: "https://parthpackaging.com/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://parthpackaging.com/",
    siteName: "Parth Packaging",
    title:
      "Parth Packaging | Reconditioned IBCs, Plastic Drums, Fiber Drums & Carboys",
    description:
      "MPCB Approved Stockist & Reconditioner in MIDC Tarapur, Boisar since 1995. Buying and supplying contamination-free, leak-tested IBC tanks, HM-HDPE plastic drums, fiber drums, and carboys.",
    images: [
      {
        url: "/images/products/ibc-plastic-pallet.png",
        width: 410,
        height: 386,
        alt: "Parth Packaging Reconditioned Intermediate Bulk Container (IBC)",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "IndustrialBusiness",
    "@id": "https://parthpackaging.com/#organization",
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.domain,
    logo: `${SITE_CONFIG.domain}${SITE_CONFIG.logos.primary}`,
    foundingDate: "1995",
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.contact.primaryMobile,
    email: SITE_CONFIG.contact.primaryEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Plot No. 29, Sonal Compound, Shivaji Nagar, Saibaba Temple Road, Near Raut Mechanic, M.I.D.C. Tarapur",
      addressLocality: "Boisar, Dist. Palghar",
      addressRegion: "Maharashtra",
      postalCode: "401501",
      addressCountry: "IN",
    },
    areaServed: SITE_CONFIG.contact.serviceRegions,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.contact.primaryMobile,
        contactType: "sales",
        email: SITE_CONFIG.contact.primaryEmail,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Marathi", "Gujarati"],
      },
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.contact.factoryPhone,
        contactType: "customer service",
        areaServed: "IN",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#292B29] selection:bg-[#F20D16] selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {children}
      </body>
    </html>
  );
}
