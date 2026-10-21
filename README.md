# Parth Packaging — Phase 1: Premium Homepage Redesign

Modern, industrial B2B homepage built with **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lucide Icons**.

## Scope & Verified Business Information
- **Company:** Parth Packaging (`M/s. Parth Packaging`)
- **Established:** 1995 in M.I.D.C. Tarapur, Boisar, Dist. Palghar, Maharashtra, India
- **Approval:** MPCB (Maharashtra Pollution Control Board) Approved Stockist & Reconditioner (`MPCB/RO (HQ)/HSMD/Amendment/P-31`)
- **Core Product Categories:**
  1. Reconditioning Intermediate Bulk Containers (IBC — 1000 Ltr. in Steel, Plastic & Wood Pallets)
  2. Reconditioning Plastic Drums (Open Top, Tight Head & 100 Ltr. SL-Ring Barrels, ISI Quality Standards)
  3. Reconditioning Carboys (20 Ltr., 30 Ltr., 35 Ltr., 50 Ltr. & 100 Ltr. HM-HDPE)
  4. Fiber Drums (12/18" to 18/28" Reusable & Recyclable Kraft Fibre Drums)

## Key Configuration Points (`src/config/site.ts`)
All contact details, WhatsApp click-to-chat number (`919823370522` from verified mobile `+91-9823370522`), product categories, and navigation items are centralized in `src/config/site.ts`.

## Packaging Requirement Studio API (`src/app/api/enquiry/route.ts`)
- Performs full server-side validation and logs structured enquiry specifications locally to `.data/enquiries.json`.
- Set `ENQUIRY_WEBHOOK_URL` in `.env.local` to connect a production SMTP relay or CRM webhook.

## Running Locally
```bash
npm.cmd run dev
```
