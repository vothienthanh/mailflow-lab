import { maskEmail } from "./email.js";
import { prepareRecipients, RECIPIENT_STATUS } from "./recipients.js";
import { renderTemplate } from "./template.js";

export function buildDryRun(rows, template, options = {}) {
  const emailField = options.emailField ?? "email";
  const mapping = options.mapping ?? {};
  const prepared = prepareRecipients(rows, { emailField });

  const messages = prepared.results.map((result) => {
    const row = rows[result.index];
    const sendable = result.status === RECIPIENT_STATUS.READY;
    return {
      index: result.index,
      rowNumber: result.rowNumber,
      recipient: maskEmail(result.originalEmail),
      status: result.status,
      duplicateOf: result.duplicateOf,
      preview: sendable
        ? {
            subject: renderTemplate(template.subject, row, mapping),
            html: renderTemplate(template.html, row, mapping),
          }
        : null,
    };
  });

  return {
    mode: "dry-run",
    networkCalls: 0,
    counts: prepared.counts,
    messages,
  };
}
