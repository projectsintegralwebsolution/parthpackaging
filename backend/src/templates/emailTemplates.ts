import { escapeHtml, formatMessageForHtml } from "../utils/htmlSanitizer.js";

export interface EmailEnquiryContext {
  referenceId: string;
  fullName: string;
  companyName: string;
  email: string;
  countryCode: string;
  phone: string;
  inquiryMode: "supply" | "buyback" | "reconditioning";
  productCategory: string;
  palletOrVariant?: string;
  quantity?: string;
  deliveryLocation?: string;
  specifications?: string;
  sourcePageUrl?: string;
  formType?: string;
  submissionTimestamp: string;
}

const BRAND_RED = "#F20D16";
const BRAND_NAVY = "#0D1F33";
const BRAND_BLUE = "#1769AA";
const BRAND_BG = "#F4F6F8";
const TEXT_DARK = "#292B29";
const TEXT_MUTED = "#5C5E5C";
const BORDER_COLOR = "#E2E2DE";

/**
 * Common shared HTML wrapper styling
 */
function wrapEmailHtml(content: string, previewText: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Parth Packaging</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
  <style>
    body { margin: 0; padding: 0; background-color: ${BRAND_BG}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: ${TEXT_DARK}; -webkit-font-smoothing: antialiased; }
    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    .card { background-color: #ffffff; border-radius: 8px; border: 1px solid ${BORDER_COLOR}; box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
    .header-bar { background-color: ${BRAND_NAVY}; padding: 20px 32px; border-top: 4px solid ${BRAND_RED}; }
    .footer-bar { padding: 24px 32px; text-align: center; color: ${TEXT_MUTED}; font-size: 12px; line-height: 1.5; }
    .data-table td { padding: 10px 14px; border-bottom: 1px solid #ECECEC; font-size: 13.5px; }
    .data-table tr:last-child td { border-bottom: none; }
    .label { color: ${TEXT_MUTED}; font-weight: 600; width: 34%; }
    .value { color: ${TEXT_DARK}; font-weight: 500; }
    .pill { display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; border-radius: 4px; letter-spacing: 0.5px; }
    .pill-red { background-color: #FEF2F2; color: ${BRAND_RED}; border: 1px solid #FCA5A5; }
    .pill-blue { background-color: #EDF5FD; color: ${BRAND_BLUE}; border: 1px solid #BAE6FD; }
  </style>
</head>
<body>
  <div style="display:none; font-size:1px; color:#333333; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden;">
    ${escapeHtml(previewText)}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND_BG}; padding: 28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 620px;" cellpadding="0" cellspacing="0" class="card">
          <!-- Header Bar -->
          <tr>
            <td class="header-bar">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">
                      PARTH <span style="color: ${BRAND_RED};">PACKAGING</span>
                    </span>
                    <div style="font-size: 11px; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px; margin-top: 3px;">
                      MPCB Approved Industrial Packaging Reconditioner &bull; Est. 1995
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 32px 24px 32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer Bar -->
          <tr>
            <td class="footer-bar" style="border-top: 1px solid #ECECEC; background-color: #FAFAFA;">
              <p style="margin: 0 0 6px 0; font-weight: 600; color: ${TEXT_DARK}; font-size: 13px;">
                M/s. Parth Packaging
              </p>
              <p style="margin: 0 0 4px 0;">
                W-104(A), M.I.D.C. Area, Opp. Kores India Ltd., Boisar - 401506, Dist. Palghar, Maharashtra
              </p>
              <p style="margin: 0;">
                Tel: +91-2525-270522 &bull; Mob: +91-9823370522 &bull; Web: <a href="https://parthpackaging.com" style="color: ${BRAND_BLUE}; text-decoration: none;">parthpackaging.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Format mode label for friendly display
 */
function getModeLabel(mode: string): string {
  switch (mode) {
    case "supply":
      return "Bulk Container Supply";
    case "buyback":
      return "Sell Empty Containers (Buyback)";
    case "reconditioning":
      return "Washing & Reconditioning Service";
    default:
      return mode;
  }
}

/**
 * EMAIL 1: Customer Confirmation Email Template
 */
export function buildCustomerConfirmationEmail(ctx: EmailEnquiryContext): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = "Thank You for Your Enquiry – Parth Packaging";
  const previewText = `We have received your enquiry regarding ${ctx.productCategory}. Reference: ${ctx.referenceId}`;

  const htmlContent = `
    <h2 style="margin: 0 0 12px 0; color: ${TEXT_DARK}; font-size: 20px; font-weight: 700;">
      Dear ${escapeHtml(ctx.fullName)},
    </h2>
    <p style="margin: 0 0 16px 0; font-size: 14.5px; line-height: 1.6; color: #374151;">
      Thank you for contacting <strong>Parth Packaging</strong>. We have successfully received your enquiry regarding <strong>${escapeHtml(ctx.productCategory)}</strong>.
    </p>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #374151;">
      Our technical and sales team in MIDC Tarapur will review your requirements and get back to you as soon as possible.
    </p>

    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 18px 20px; margin-bottom: 24px;">
      <div style="font-size: 12px; font-weight: 700; color: ${BRAND_BLUE}; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px;">
        Here is a summary of your submitted enquiry:
      </div>
      <table role="presentation" width="100%" class="data-table" cellpadding="0" cellspacing="0">
        <tr>
          <td class="label">Enquiry Reference:</td>
          <td class="value"><span class="pill pill-red">${escapeHtml(ctx.referenceId)}</span></td>
        </tr>
        <tr>
          <td class="label">Name:</td>
          <td class="value">${escapeHtml(ctx.fullName)}</td>
        </tr>
        <tr>
          <td class="label">Email:</td>
          <td class="value">${escapeHtml(ctx.email)}</td>
        </tr>
        <tr>
          <td class="label">Phone:</td>
          <td class="value">${escapeHtml(ctx.countryCode)} ${escapeHtml(ctx.phone)}</td>
        </tr>
        ${ctx.companyName ? `<tr><td class="label">Company:</td><td class="value">${escapeHtml(ctx.companyName)}</td></tr>` : ""}
        <tr>
          <td class="label">Product / Service:</td>
          <td class="value"><strong>${escapeHtml(ctx.productCategory)}</strong></td>
        </tr>
        <tr>
          <td class="label">Requirement Mode:</td>
          <td class="value">${escapeHtml(getModeLabel(ctx.inquiryMode))}</td>
        </tr>
        ${ctx.palletOrVariant ? `<tr><td class="label">Configuration:</td><td class="value">${escapeHtml(ctx.palletOrVariant)}</td></tr>` : ""}
        ${ctx.quantity ? `<tr><td class="label">Approx. Quantity:</td><td class="value">${escapeHtml(ctx.quantity)}</td></tr>` : ""}
        ${ctx.deliveryLocation ? `<tr><td class="label">Delivery Location:</td><td class="value">${escapeHtml(ctx.deliveryLocation)}</td></tr>` : ""}
        <tr>
          <td class="label">Message / Notes:</td>
          <td class="value">${formatMessageForHtml(ctx.specifications)}</td>
        </tr>
      </table>
    </div>

    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #374151;">
      If you need urgent assistance or wish to discuss an immediate bulk dispatch, please feel free to call our factory directly at <strong>+91-9823370522</strong>.
    </p>
    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #374151;">
      Thank you for your interest in Parth Packaging.<br/><br/>
      Best regards,<br/>
      <strong>Parth Packaging Team</strong>
    </p>
  `;

  const text = `Dear ${ctx.fullName},

Thank you for contacting Parth Packaging.
We have successfully received your enquiry regarding ${ctx.productCategory}.
Our team will review your requirements and get back to you as soon as possible.

Here is a summary of your submitted enquiry:
Name: ${ctx.fullName}
Email: ${ctx.email}
Phone: ${ctx.countryCode} ${ctx.phone}
${ctx.companyName ? `Company: ${ctx.companyName}\n` : ""}Product: ${ctx.productCategory}
Requirement Mode: ${getModeLabel(ctx.inquiryMode)}
${ctx.palletOrVariant ? `Configuration: ${ctx.palletOrVariant}\n` : ""}${ctx.quantity ? `Quantity: ${ctx.quantity}\n` : ""}${ctx.deliveryLocation ? `Location: ${ctx.deliveryLocation}\n` : ""}Message: ${ctx.specifications || "No additional specifications provided"}
Enquiry Reference: ${ctx.referenceId}

Thank you for your interest in Parth Packaging.

Best regards,
Parth Packaging Team
MIDC Tarapur, Boisar, Dist. Palghar, Maharashtra
Phone: +91-9823370522 / +91-2525-270522
Website: https://parthpackaging.com
`;

  return {
    subject,
    html: wrapEmailHtml(htmlContent, previewText),
    text,
  };
}

/**
 * EMAIL 2: Parth Packaging Owner Notification Email Template
 */
export function buildOwnerNotificationEmail(ctx: EmailEnquiryContext): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `New Website Enquiry – ${ctx.productCategory}`;
  const previewText = `New customer enquiry from ${ctx.fullName} (${ctx.companyName || "Individual"}). Product: ${ctx.productCategory}`;

  const htmlContent = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
      <span class="pill pill-red">NEW LEAD FROM WEBSITE</span>
      <span style="font-size: 12px; color: ${TEXT_MUTED}; font-family: monospace;">Ref: ${escapeHtml(ctx.referenceId)}</span>
    </div>

    <h2 style="margin: 0 0 8px 0; color: ${TEXT_DARK}; font-size: 20px; font-weight: 800;">
      New Customer Enquiry Received
    </h2>
    <p style="margin: 0 0 20px 0; font-size: 14px; color: #4B5563;">
      A prospective client has submitted an industrial packaging requirement via the Parth Packaging website.
    </p>

    <!-- Priority Contact Card -->
    <div style="background-color: #EFF6FF; border: 1.5px solid #93C5FD; border-radius: 8px; padding: 18px 20px; margin-bottom: 24px;">
      <div style="font-size: 11px; font-weight: 800; color: ${BRAND_BLUE}; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px;">
        DIRECT CUSTOMER CONTACT INFO (Click Reply to respond directly)
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
        <tr>
          <td style="padding: 4px 0; font-weight: 700; color: ${TEXT_DARK}; width: 30%;">Customer Name:</td>
          <td style="padding: 4px 0; color: #1E3A8A; font-weight: 700; font-size: 15px;">${escapeHtml(ctx.fullName)}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; font-weight: 700; color: ${TEXT_DARK};">Company Name:</td>
          <td style="padding: 4px 0; color: ${TEXT_DARK}; font-weight: 600;">${escapeHtml(ctx.companyName || "Not provided")}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; font-weight: 700; color: ${TEXT_DARK};">Email Address:</td>
          <td style="padding: 4px 0;"><a href="mailto:${escapeHtml(ctx.email)}" style="color: ${BRAND_RED}; font-weight: 700; text-decoration: underline;">${escapeHtml(ctx.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 4px 0; font-weight: 700; color: ${TEXT_DARK};">Phone / Mobile:</td>
          <td style="padding: 4px 0;"><a href="tel:${escapeHtml(ctx.countryCode)}${escapeHtml(ctx.phone)}" style="color: #047857; font-weight: 700; text-decoration: none;">${escapeHtml(ctx.countryCode)} ${escapeHtml(ctx.phone)}</a> &nbsp;&bull;&nbsp; <a href="https://wa.me/${escapeHtml(ctx.countryCode.replace(/\+/, ""))}${escapeHtml(ctx.phone)}" style="color: #047857; font-size: 12px; text-decoration: underline;">WhatsApp</a></td>
        </tr>
      </table>
    </div>

    <!-- Requirement Details Table -->
    <div style="border: 1px solid ${BORDER_COLOR}; border-radius: 6px; overflow: hidden; margin-bottom: 24px;">
      <div style="background-color: #F8FAFC; padding: 10px 16px; font-size: 12px; font-weight: 700; text-transform: uppercase; color: ${TEXT_DARK}; letter-spacing: 0.5px; border-bottom: 1px solid ${BORDER_COLOR};">
        Product &amp; Specification Breakdown
      </div>
      <table role="presentation" width="100%" class="data-table" cellpadding="0" cellspacing="0">
        <tr>
          <td class="label">Product / Category:</td>
          <td class="value"><strong style="color: ${BRAND_RED}; font-size: 14.5px;">${escapeHtml(ctx.productCategory)}</strong></td>
        </tr>
        <tr>
          <td class="label">Requirement Type:</td>
          <td class="value"><span class="pill pill-blue">${escapeHtml(getModeLabel(ctx.inquiryMode))}</span></td>
        </tr>
        <tr>
          <td class="label">Pallet / Configuration:</td>
          <td class="value">${escapeHtml(ctx.palletOrVariant || "Standard Specification")}</td>
        </tr>
        <tr>
          <td class="label">Approx. Quantity:</td>
          <td class="value"><strong>${escapeHtml(ctx.quantity || "Not specified")}</strong></td>
        </tr>
        <tr>
          <td class="label">Delivery Location:</td>
          <td class="value">${escapeHtml(ctx.deliveryLocation || "Not specified")}</td>
        </tr>
        <tr>
          <td class="label">Customer Notes / Specs:</td>
          <td class="value" style="background-color: #FFFBEB; padding: 12px; border-radius: 4px; border: 1px solid #FDE68A;">
            ${formatMessageForHtml(ctx.specifications)}
          </td>
        </tr>
      </table>
    </div>

    <!-- Submission Metadata -->
    <div style="font-size: 11.5px; color: ${TEXT_MUTED}; background-color: #F8FAFC; padding: 12px 16px; border-radius: 6px; border: 1px dashed ${BORDER_COLOR};">
      <strong>Submission Metadata:</strong><br/>
      &bull; Reference ID: ${escapeHtml(ctx.referenceId)}<br/>
      &bull; Date &amp; Time (UTC): ${escapeHtml(ctx.submissionTimestamp)}<br/>
      &bull; Form Type: ${escapeHtml(ctx.formType || "Packaging Requirement Studio")}<br/>
      ${ctx.sourcePageUrl ? `&bull; Source Page: <a href="${escapeHtml(ctx.sourcePageUrl)}" style="color: ${BRAND_BLUE};">${escapeHtml(ctx.sourcePageUrl)}</a><br/>` : ""}
    </div>
  `;

  const text = `NEW WEBSITE ENQUIRY – PARTH PACKAGING
Reference ID: ${ctx.referenceId}
Submission Timestamp: ${ctx.submissionTimestamp}

CUSTOMER CONTACT DETAILS:
Name: ${ctx.fullName}
Company: ${ctx.companyName || "Not provided"}
Email: ${ctx.email}
Phone: ${ctx.countryCode} ${ctx.phone}

REQUIREMENT SPECIFICATION:
Product: ${ctx.productCategory}
Requirement Mode: ${getModeLabel(ctx.inquiryMode)}
Pallet / Configuration: ${ctx.palletOrVariant || "Standard"}
Quantity: ${ctx.quantity || "Not specified"}
Delivery Location: ${ctx.deliveryLocation || "Not specified"}
Customer Message: ${ctx.specifications || "No additional specifications"}

SOURCE:
Form Type: ${ctx.formType || "Packaging Requirement Studio"}
Source Page URL: ${ctx.sourcePageUrl || "Direct"}

Reply directly to this email to contact ${ctx.fullName}.
`;

  return {
    subject,
    html: wrapEmailHtml(htmlContent, previewText),
    text,
  };
}

/**
 * EMAIL 3: Integral Web Solution Notification Email Template
 */
export function buildDeveloperNotificationEmail(ctx: EmailEnquiryContext): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `New Parth Packaging Website Enquiry – ${ctx.productCategory}`;
  const previewText = `Parth Packaging website lead: ${ctx.fullName} (${ctx.companyName || "Individual"}), Product: ${ctx.productCategory}`;

  const htmlContent = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
      <span class="pill pill-blue">INTEGRAL WEB SOLUTION &bull; LEAD AUDIT</span>
      <span style="font-size: 12px; color: ${TEXT_MUTED}; font-family: monospace;">Ref: ${escapeHtml(ctx.referenceId)}</span>
    </div>

    <h2 style="margin: 0 0 8px 0; color: ${TEXT_DARK}; font-size: 19px; font-weight: 800;">
      Parth Packaging Website — Lead Notification
    </h2>
    <p style="margin: 0 0 20px 0; font-size: 13.5px; color: #4B5563;">
      This notification confirms that a valid packaging enquiry was received through <strong>parthpackaging.com</strong> and logged to persistent storage.
    </p>

    <!-- Client & Lead Overview -->
    <div style="background-color: #F8FAFC; border: 1px solid #CBD5E1; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
      <table role="presentation" width="100%" class="data-table" cellpadding="0" cellspacing="0">
        <tr>
          <td class="label">Reference ID:</td>
          <td class="value"><span class="pill pill-red">${escapeHtml(ctx.referenceId)}</span></td>
        </tr>
        <tr>
          <td class="label">Customer Name:</td>
          <td class="value"><strong>${escapeHtml(ctx.fullName)}</strong></td>
        </tr>
        <tr>
          <td class="label">Company:</td>
          <td class="value">${escapeHtml(ctx.companyName || "Not provided")}</td>
        </tr>
        <tr>
          <td class="label">Email:</td>
          <td class="value"><a href="mailto:${escapeHtml(ctx.email)}" style="color: ${BRAND_BLUE}; font-weight: 600;">${escapeHtml(ctx.email)}</a></td>
        </tr>
        <tr>
          <td class="label">Phone:</td>
          <td class="value">${escapeHtml(ctx.countryCode)} ${escapeHtml(ctx.phone)}</td>
        </tr>
        <tr>
          <td class="label">Product / Service:</td>
          <td class="value"><strong>${escapeHtml(ctx.productCategory)}</strong></td>
        </tr>
        <tr>
          <td class="label">Mode:</td>
          <td class="value">${escapeHtml(getModeLabel(ctx.inquiryMode))}</td>
        </tr>
        ${ctx.palletOrVariant ? `<tr><td class="label">Configuration:</td><td class="value">${escapeHtml(ctx.palletOrVariant)}</td></tr>` : ""}
        ${ctx.quantity ? `<tr><td class="label">Quantity:</td><td class="value">${escapeHtml(ctx.quantity)}</td></tr>` : ""}
        ${ctx.deliveryLocation ? `<tr><td class="label">Location:</td><td class="value">${escapeHtml(ctx.deliveryLocation)}</td></tr>` : ""}
        <tr>
          <td class="label">Customer Message:</td>
          <td class="value">${formatMessageForHtml(ctx.specifications)}</td>
        </tr>
      </table>
    </div>

    <!-- Technical Source Information -->
    <div style="font-size: 11.5px; color: #64748B; background-color: #F1F5F9; padding: 12px 16px; border-radius: 6px;">
      <strong>Technical Audit Info:</strong><br/>
      &bull; Source Platform: Parth Packaging Web (Next.js + Express.js)<br/>
      &bull; Form Type: ${escapeHtml(ctx.formType || "Packaging Requirement Studio")}<br/>
      &bull; Source URL: ${escapeHtml(ctx.sourcePageUrl || "https://parthpackaging.com")}<br/>
      &bull; Timestamp: ${escapeHtml(ctx.submissionTimestamp)}<br/>
      &bull; Developer Recipient: princekumarjha80@gmail.com
    </div>
  `;

  const text = `PARTH PACKAGING WEBSITE LEAD — INTEGRAL WEB SOLUTION NOTIFICATION
Enquiry Reference: ${ctx.referenceId}
Originating Website: https://parthpackaging.com
Timestamp: ${ctx.submissionTimestamp}

LEAD DETAILS:
Customer Name: ${ctx.fullName}
Company: ${ctx.companyName || "Not provided"}
Customer Email: ${ctx.email}
Customer Phone: ${ctx.countryCode} ${ctx.phone}
Product / Service: ${ctx.productCategory}
Requirement Mode: ${getModeLabel(ctx.inquiryMode)}
Configuration: ${ctx.palletOrVariant || "Standard"}
Quantity: ${ctx.quantity || "Not specified"}
Location: ${ctx.deliveryLocation || "Not specified"}
Customer Message: ${ctx.specifications || "No message provided"}

AUDIT METADATA:
Form Type: ${ctx.formType || "Packaging Requirement Studio"}
Source Page: ${ctx.sourcePageUrl || "Direct"}
Developer Notification Email: princekumarjha80@gmail.com

(Reply-To is configured directly to ${ctx.email})
`;

  return {
    subject,
    html: wrapEmailHtml(htmlContent, previewText),
    text,
  };
}
