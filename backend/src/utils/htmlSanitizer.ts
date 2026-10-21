/**
 * Safe HTML escaping utility to prevent HTML/script injection inside notification emails.
 */
export function escapeHtml(input: string | null | undefined): string {
  if (input === null || input === undefined) {
    return "";
  }
  const str = String(input);
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Escape HTML and preserve line breaks as <br/>
 */
export function formatMessageForHtml(message: string | null | undefined): string {
  if (!message) return "<em>No message provided</em>";
  const escaped = escapeHtml(message.trim());
  return escaped.replace(/\r?\n/g, "<br/>");
}
