export interface ProductVariant {
  name: string;
  spec: string;
}

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  href: string;
  image: string;
  secondaryImages?: string[];
  capacityRange: string;
  material: string;
  compliance: string;
  keyFeatures: string[];
  variants: ProductVariant[];
  applications: string[];
  featuredInMegaMenu?: boolean;
}

export interface HeroSlide {
  id: string;
  badge: string;
  headline: string;
  highlightText: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    productPreselect?: string;
  };
  productImage: string;
  productImageAlt: string;
  bgImage: string;
  specs: {
    label: string;
    value: string;
  }[];
}

export interface NavItem {
  label: string;
  href: string;
  hasMegaMenu?: boolean;
}

export const SITE_CONFIG = {
  name: "Parth Packaging",
  legalName: "M/s. Parth Packaging",
  establishedYear: 1995,
  ApprovalBadge: "MPCB Approved Stockist & Reconditioner",
  mpcbConsentNo: "MPCB/RO (HQ)/HSMD/Amendment/P-31",
  tagline:
    "Manufacturer, Supplier, Stockist & Buyer of Reconditioned IBCs, Plastic Drums, Fiber Drums & Carboys",
  domain: "https://parthpackaging.com",
  description:
    "Parth Packaging is an MPCB approved stockist, reconditioner, supplier, and buyer of Intermediate Bulk Containers (IBC), Plastic Drums, Fiber Drums, and Carboys based in MIDC Tarapur, Boisar, Maharashtra, India since 1995.",
  logos: {
    primary: "/images/parthlogo.png",
    supplied: "/images/parth-logo-supplied.png",
    width: 484,
    height: 100,
    alt: "Parth Packaging Official Logo",
  },
  contact: {
    factoryPhone: "+91-2525-270522",
    factoryPhoneHref: "tel:+912525270522",
    primaryMobile: "+91-9823370522",
    primaryMobileHref: "tel:+919823370522",
    secondaryMobile: "+91-8805763390",
    secondaryMobileHref: "tel:+918805763390",
    primaryEmail: "info@parthpackaging.com",
    secondaryEmail: "pratapbhanushali23@yahoo.com",
    // Verified primary mobile number (+91-9823370522) configured for official WhatsApp Click-to-Chat URL
    whatsappNumber: "919823370522",
    whatsappDisplay: "+91-9823370522",
    whatsappDefaultMessage:
      "Hello Parth Packaging, I would like to enquire about your reconditioned industrial packaging containers.",
    address: {
      line1: "Plot No. 29, Sonal Compound,",
      line2: "Shivaji Nagar, Saibaba Temple Road,",
      line3: "Near Raut Mechanic, M.I.D.C. Tarapur,",
      city: "Boisar - 401501",
      district: "Dist. Palghar",
      state: "Maharashtra",
      country: "India",
      full: "Plot No. 29, Sonal Compound, Shivaji Nagar, Saibaba Temple Road, Near Raut Mechanic, M.I.D.C. Tarapur, Boisar - 401501, Dist. Palghar, Maharashtra, India.",
    },
    serviceRegions: [
      "Boisar",
      "MIDC Tarapur",
      "Palghar",
      "Dahanu",
      "Vasai",
      "Mumbai",
      "Maharashtra",
      "Vapi",
      "Valsad",
      "Gujarat",
      "All Over India",
    ],
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "#company-introduction" },
    { label: "Products", href: "#product-categories", hasMegaMenu: true },
    { label: "Quality Policy", href: "#quality-capabilities" },
    { label: "Certificate", href: "#mpcb-compliance" },
    { label: "Contact Us", href: "#footer-contact" },
  ] as NavItem[],
  developerCredit: {
    label: "Integral Web Solution",
    url: "https://integralwebsolution.in/",
  },
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "reconditioning-ibc",
    badge: "MPCB Approved Reconditioner • Since 1995",
    headline: "Industrial-Grade Reconditioned",
    highlightText: "Intermediate Bulk Containers (IBC)",
    description:
      "Environmentally responsible 1000 Ltr. bulk packaging for hazardous and non-hazardous liquids. Chemically decontaminated, dried, and 100% leak-tested with multi-stage quality inspection.",
    primaryCta: {
      label: "Explore Our Products",
      href: "#product-categories",
    },
    secondaryCta: {
      label: "Request an Enquiry",
      productPreselect: "Reconditioning IBC (1000 Ltr.)",
    },
    productImage: "/images/products/ibc-plastic-pallet.png",
    productImageAlt:
      "Reconditioned 1000 Litre Intermediate Bulk Container (IBC) with galvanized steel cage and pallet",
    bgImage: "/images/facility/warehouse-ibc-drums.jpg",
    specs: [
      { label: "Standard Capacity", value: "1,000 Litres (MT Tank)" },
      { label: "Pallet Options", value: "Steel, Plastic & Wood" },
      { label: "Quality Assurance", value: "100% Leak Proof & Contamination Free" },
    ],
  },
  {
    id: "plastic-drums",
    badge: "ISI Quality Standard Compliant • Open & Tight Head",
    headline: "Heavy-Duty Reconditioned",
    highlightText: "HDPE Plastic Drums & Barrels",
    description:
      "We generate value for your empty plastic drums and supply high-strength Open Top and Tight Head HM-HDPE barrels with leak-proof auto-sealing mouths and export-worthy SL-Ring dimensions.",
    primaryCta: {
      label: "Explore Our Products",
      href: "#product-categories",
    },
    secondaryCta: {
      label: "Request an Enquiry",
      productPreselect: "Reconditioning Plastic Drums",
    },
    productImage: "/images/products/plastic-drums.png",
    productImageAlt:
      "Reconditioned Blue HDPE Tight Head and Open Top Industrial Plastic Drums",
    bgImage: "/images/facility/reconditioning-inspection.jpg",
    specs: [
      { label: "Drum Configurations", value: "Open Head & Tight Head (Closed)" },
      { label: "Capacity Range", value: "100 Ltr. SL-Ring to 200 Ltr. Barrels" },
      { label: "Standard Colours", value: "Blue, Black & Natural HDPE" },
    ],
  },
  {
    id: "carboys-and-fiber-drums",
    badge: "Complete Industrial Container Range • MIDC Tarapur",
    headline: "Precision Reconditioned",
    highlightText: "HDPE Carboys & Kraft Fiber Drums",
    description:
      "From 20–100 Ltr. narrow and wide-mouth HM-HDPE carboys for liquid chemicals to customizable 12/18\"–18/28\" recyclable fiber drums for powders, pastes, granules, and welding wire.",
    primaryCta: {
      label: "Explore Our Products",
      href: "#product-categories",
    },
    secondaryCta: {
      label: "Request an Enquiry",
      productPreselect: "Reconditioning Carboys / Fiber Drums",
    },
    productImage: "/images/products/carboys-assortment.png",
    productImageAlt:
      "Assortment of Reconditioned Blue HDPE Carboys, Narrow Mouth Jerrycans and Wide Mouth Barrels",
    bgImage: "/images/facility/industrial-logistics-yard.jpg",
    specs: [
      { label: "Carboy Capacities", value: "20 Ltr., 30 Ltr., 35 Ltr., 50 Ltr. & 100 Ltr." },
      { label: "Fiber Drum Sizes", value: "12/18 inch up to 18/28 inch" },
      { label: "Sustainability", value: "Reusable, Decontaminated & Recyclable" },
    ],
  },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "reconditioning-ibc",
    slug: "reconditioning-ibc",
    name: "Reconditioning Intermediate Bulk Containers (IBC)",
    shortName: "Reconditioning IBC",
    tagline: "1000 Ltr. Contamination-Free Bulk Liquid & Chemical Containers",
    description:
      "Environmentally friendly bulk packaging option for hazardous and non-hazardous products, processed using purpose-built decontamination, chemical cleaning, drying, and leak-testing equipment.",
    detailedDescription:
      "Our Reconditioned IBCs are processed through a rigorous multi-stage protocol: residual removal and treatment, chemical cleaning, thermal drying, and 100% pressure/leak testing with inspections at every stage by our trained workforce.",
    href: "#product-reconditioning-ibc",
    image: "/images/products/ibc-plastic-pallet.png",
    secondaryImages: [
      "/images/products/ibc-steel-pallet.png",
      "/images/products/ibc-wood-pallet.png",
      "/images/products/ibc-front.png",
    ],
    capacityRange: "1,000 Ltr. (MT Tank)",
    material: "UV-Stabilized HDPE Inner Bottle with Galvanized Steel Cage",
    compliance: "MPCB Authorized Decontamination & Leak Tested",
    keyFeatures: [
      "100% Contamination-Free & Chemically Cleaned",
      "Ready Stock Available for Immediate Dispatch",
      "Available in Steel, Plastic, or Wood Pallet Bases",
      "100% Leak-Proof with Stage-by-Stage Inspection",
    ],
    variants: [
      { name: "Reconditioned IBC on Steel Pallet", spec: "1000 Ltr. Heavy-Duty" },
      { name: "Reconditioned IBC on Plastic Pallet", spec: "1000 Ltr. Corrosion-Resistant" },
      { name: "Reconditioned IBC on Wooden Pallet", spec: "1000 Ltr. Standard Industrial" },
      { name: "Used MT Tank", spec: "1000 Ltr. Bulk Storage" },
    ],
    applications: [
      "Hazardous & Non-Hazardous Liquid Chemicals",
      "Bulk Solvents, Oils & Industrial Effluents",
      "Agrochemicals & Specialty Intermediates",
    ],
    featuredInMegaMenu: true,
  },
  {
    id: "reconditioning-plastic-drums",
    slug: "reconditioning-plastic-drums",
    name: "Reconditioning Plastic Drums",
    shortName: "Reconditioning Plastic Drums",
    tagline: "Open Top, Tight Head & SL-Ring HM-HDPE Industrial Barrels",
    description:
      "Heavy-duty industrial plastic drums in compliance with ISI quality standards. Available in Open Top and Tight Head (Closed Head) designs with leak-proof auto-sealing mouths and two-way vented plugs.",
    detailedDescription:
      "Manufactured from superior quality HM-HDPE and reconditioned to exacting standards, our plastic drums and 100–200 Ltr. SL-Ring barrels offer high resistance to wear and tear, stackable top-and-bottom geometry, and export-worthy dimensions that maximize payload potential.",
    href: "#product-reconditioning-plastic-drums",
    image: "/images/products/plastic-drums.png",
    secondaryImages: [
      "/images/products/plastic-drum-tight-head.png",
      "/images/products/plastic-drum-open-top.png",
    ],
    capacityRange: "100 Ltr. – 200 Ltr.",
    material: "High Molecular High-Density Polyethylene (HM-HDPE) / PVC",
    compliance: "ISI Quality Standards Compliant",
    keyFeatures: [
      "Open Head (with Clamping Ring) & Tight Head (Closed) Drums",
      "Leak-Proof Mouth with Auto-Sealing System",
      "Two-Way Vented Plugs for Pressure Release & Venting",
      "Standard Colours: Blue, Black & Natural",
    ],
    variants: [
      { name: "Used Closed Head (Tight Head) Plastic Drum", spec: "200 Ltr. / Standard" },
      { name: "Used Open Top Plastic Drum", spec: "With Lid & Metal Ring" },
      { name: "SL-Ring Barrel", spec: "100 Ltr. Stackable" },
      { name: "Used HM-HDPE & PVC Drums", spec: "200 Ltr. Heavy-Duty" },
    ],
    applications: [
      "Chemical Manufacturing & Acid/Alkali Storage",
      "Lubricating Oils & Petroleum Derivatives",
      "Food Processing & Bulk Liquid Transport",
    ],
  },
  {
    id: "reconditioning-carboys",
    slug: "reconditioning-carboys",
    name: "Reconditioning Carboys",
    shortName: "Reconditioning Carboys",
    tagline: "20 Ltr. to 100 Ltr. Narrow & Wide-Mouth HDPE Containers",
    description:
      "Dimensionally accurate, lightweight, and easy-to-handle plastic carboys and jerrycans customized per client specifications, featuring ergonomic integrated handles and secure leak-proof closures.",
    detailedDescription:
      "We supply a comprehensive range of reconditioned open-top and narrow-mouth HM-HDPE carboys across 20 Ltr., 30 Ltr., 35 Ltr., 50 Ltr., and 100 Ltr. capacities. Designed for safe manual and palletized handling of liquid substances and specialty chemicals.",
    href: "#product-reconditioning-carboys",
    image: "/images/products/carboys-assortment.png",
    capacityRange: "20 Ltr., 30 Ltr., 35 Ltr., 50 Ltr. – 100 Ltr.",
    material: "High-Grade HM-HDPE",
    compliance: "ISI Standard & Leak-Tested Closures",
    keyFeatures: [
      "Ergonomic Centre & Side Handles for Safe Handling",
      "Dimensionally Accurate & Stackable Profiles",
      "Available in Narrow-Mouth Jerrycan & Wide-Mouth Designs",
      "High Chemical & Impact Resistance",
    ],
    variants: [
      { name: "Used Carboys 20 Ltr. & 30 Ltr.", spec: "Jerrycan / Narrow Mouth" },
      { name: "Used Carboys 35 Ltr. & 50 Ltr.", spec: "Standard Chemical Carboy" },
      { name: "Used Cans & Wide-Mouth Carboys", spec: "Up to 100 Ltr. Capacity" },
    ],
    applications: [
      "Specialty Chemicals & Laboratory Reagents",
      "Edible Oils, Syrups & Food Ingredients",
      "Cleaning Agents, Detergents & Disinfectants",
    ],
  },
  {
    id: "fiber-drums",
    slug: "fiber-drums",
    name: "Fiber Drums",
    shortName: "Fiber Drums",
    tagline: "12/18\" to 18/28\" Reusable & Recyclable Kraft Fibre Drums",
    description:
      "Standard and customized reconditioned fibre drums with low tare weight and optional moisture protection barriers—engineered for powders, granules, pastes, solids, semi-liquids, and welding wire.",
    detailedDescription:
      "Our reconditioned fibre drums combine high structural strength with low tare weight to reduce transport costs. At the end of service life, steel chime rings, lids, and kraft fibre bodies can be easily separated and recycled through conventional waste streams without mechanical assistance.",
    href: "#product-fiber-drums",
    image: "/images/products/fiber-drums.png",
    capacityRange: "Size Range: 12/18\" up to 18/28\" (in inches)",
    material: "Multi-Ply Kraft Fibreboard with Steel Chime & Lever-Lock Ring",
    compliance: "100% Reusable & Easily Recyclable Components",
    keyFeatures: [
      "Sizes from 12/18 inch up to 18/28 inch",
      "Moisture Protection Barriers Available",
      "Low Tare Weight for Lower Transport Costs",
      "Fully Customizable (e.g., Welding-Wire Industry)",
    ],
    variants: [
      { name: "Standard Reconditioned Fiber Drum", spec: "12/18\" to 18/28\" Sizes" },
      { name: "Moisture-Barrier Fiber Drum", spec: "For Hygroscopic Powders & Pastes" },
      { name: "Customized Welding-Wire Fiber Drum", spec: "Industry-Specific Core/Fit" },
    ],
    applications: [
      "Pharmaceutical Bulk Drugs, Powders & Granules",
      "Welding-Wire Packaging & Engineering Coils",
      "Dyes, Pigments, Pastes, Solids & Hazardous Dry Goods",
    ],
  },
];

export const EXTENDED_PRODUCT_OFFERINGS = [
  "Used Reconditioning IBC (1000 Ltr.)",
  "Used Plastic Drums (Open & Closed Head)",
  "Used Carboys (20L, 35L, 50L)",
  "Used Fiber Drums (12/18\" – 18/28\")",
  "Used HM-HDPE Drums",
  "Used PVC Drums (200 Ltr.)",
  "Used Composite Drums",
  "Used M.S. (Mild Steel) Drums & Barrels",
  "Used Stainless Steel (SS) Drums",
  "Used Carbon Steel Drums",
  "Used Closed Head M.S. Drums",
  "Used MT Tank (1000 Ltr.) & 100 Ltr. Cans",
];

export const WHY_CHOOSE_US = [
  {
    id: "mpcb-approved",
    title: "MPCB Approved Reconditioner Since 1995",
    description:
      "Operating from our established unit in MIDC Tarapur, Boisar since 1995, Parth Packaging is an MPCB authorized stockist and reconditioner adhering to strict pollution control and effluent treatment standards.",
    highlight: "Est. 1995 • MIDC Tarapur",
    iconName: "ShieldCheck",
  },
  {
    id: "decontamination-quality",
    title: "Multi-Stage Cleaning & 100% Leak Testing",
    description:
      "We employ purpose-built equipment for residual removal, chemical washing, thermal drying, and stage-by-stage leak testing so every IBC, drum, and carboy is delivered contamination-free.",
    highlight: "Stage-by-Stage Inspection",
    iconName: "Droplets",
  },
  {
    id: "bulk-capacity-vendor-network",
    title: "High Bulk Order Capacity & Vendor Rigor",
    description:
      "Backed by competent procuring agents who evaluate vendors on production capacity, quality consistency, and cost effectiveness, we maintain ready stock to fulfill urgent and large-volume industrial orders.",
    highlight: "Ready Stock & Bulk Supply",
    iconName: "PackageCheck",
  },
  {
    id: "timely-delivery-connectivity",
    title: "Cost-Effective Pricing & Timely Delivery",
    description:
      "Our segregated warehousing facility in Boisar is strategically connected to major highways and ports across Mumbai, Palghar, Vasai, Vapi, Valsad, and Gujarat—ensuring rapid, dependable dispatch across India.",
    highlight: "Maharashtra, Gujarat & Pan-India",
    iconName: "Truck",
  },
];

export const PACKAGING_APPLICATIONS = [
  {
    id: "hazardous-chemicals",
    title: "Hazardous & Non-Hazardous Chemicals",
    categoryTag: "IBCs, SL-Ring Barrels & Tight-Head Drums",
    description:
      "Safe handling, storage, and transportation of liquid chemicals, acids, alkalis, and industrial solvents requiring leak-proof auto-sealing closures and vented plugs.",
    recommendedProducts: ["Reconditioning IBC", "100L SL-Ring Barrel", "HM-HDPE Tight-Head Drums"],
    iconName: "FlaskConical",
  },
  {
    id: "oils-lubricants",
    title: "Oils, Lubricants & Industrial Liquids",
    categoryTag: "Closed Head Plastic & M.S. Steel Drums",
    description:
      "Heavy-duty 200 Ltr. plastic drums, PVC drums, and mild/stainless steel barrels engineered for high wear resistance, palletized stacking, and export distribution.",
    recommendedProducts: ["Closed Head Plastic Drums", "M.S. & SS Drums", "200 Ltr. PVC Drums"],
    iconName: "Fuel",
  },
  {
    id: "powders-pastes-solids",
    title: "Powders, Granules, Pastes & Semi-Liquids",
    categoryTag: "Fiber Drums & Open-Top Drums",
    description:
      "Reconditioned kraft fiber drums (12/18\" to 18/28\") with moisture protection barriers and wide-mouth open-top plastic drums with clamping rings for dry and semi-liquid goods.",
    recommendedProducts: ["Fiber Drums (12/18\"–18/28\")", "Open Top Plastic Drums", "Composite Drums"],
    iconName: "Layers",
  },
  {
    id: "welding-wire-specialty",
    title: "Welding-Wire, Food & Specialty Packaging",
    categoryTag: "Customized Fiber Drums & 20–100L Carboys",
    description:
      "Customized fiber drums tailored for the welding-wire industry alongside 20 Ltr., 35 Ltr., 50 Ltr., and 100 Ltr. HM-HDPE carboys for food-grade and specialty industrial liquids.",
    recommendedProducts: ["Custom Fiber Drums", "35L & 50L HDPE Carboys", "100L Wide-Mouth Cans"],
    iconName: "Wrench",
  },
  {
    id: "empty-drum-buyback",
    title: "Empty Container Buyback & Reconditioning",
    categoryTag: "Industrial Drum & IBC Procurement",
    description:
      "We buy used empty plastic drums, IBC tanks, M.S. barrels, and carboys directly from industrial plants, generating value for your empty containers through authorized recycling and reconditioning.",
    recommendedProducts: ["Empty IBC Totes", "Used HDPE & MS Barrels", "Used Carboys & Fiber Drums"],
    iconName: "Recycle",
  },
];

export const RECONDITIONING_PROCESS_STEPS = [
  {
    step: "01",
    title: "Residual Removal & Decontamination",
    description:
      "Purpose-built equipment safely extracts and treats residual contents from used IBCs, HDPE drums, M.S. barrels, and carboys in accordance with MPCB hazardous waste rules.",
  },
  {
    step: "02",
    title: "Chemical Cleaning & Closed-Loop Washing",
    description:
      "Containers undergo intensive chemical and high-pressure internal/external washing. All trade effluent is treated via our in-house ETP and reused for cleaning with zero outside discharge.",
  },
  {
    step: "03",
    title: "Thermal Drying, Repair & Reconditioning",
    description:
      "Thorough thermal drying is followed by structural reconditioning—inspecting cages, pallets, chimes, auto-sealing bungs, and two-way vented plugs.",
  },
  {
    step: "04",
    title: "100% Leak Testing & Stage Inspection",
    description:
      "Every reconditioned container undergoes strict pressure and leak testing with quality inspections at every stage by our trained workforce prior to segregated warehousing.",
  },
];

export const WAREHOUSE_FEATURES = [
  {
    title: "Segregated & Labeled Sections",
    description:
      "Organized storage zones clearly labeled by container type and specification for rapid identification and inventory accuracy.",
  },
  {
    title: "Proper Ventilation & Dust-Free Storage",
    description:
      "Engineered airflow systems and pest-free, dust-free warehousing preserve the internal cleanliness of decontaminated containers.",
  },
  {
    title: "Comprehensive Fire Safety",
    description:
      "Equipped with industrial fire safety arrangements across all storage and reconditioning bays at MIDC Tarapur.",
  },
  {
    title: "Road & Port Connectivity",
    description:
      "Direct logistics access to NH-48, Mumbai, Palghar, Vasai, Vapi, Valsad, and western sea ports for timely bulk dispatch.",
  },
];
