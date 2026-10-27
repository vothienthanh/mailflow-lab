import { isEmail, normalizeEmail } from "./email.js";

export const RECIPIENT_STATUS = Object.freeze({
  READY: "ready",
  SKIPPED_INVALID: "skipped_invalid",
  SKIPPED_DUPLICATE: "skipped_duplicate",
});

export function prepareRecipients(rows, { emailField = "email" } = {}) {
  if (!Array.isArray(rows)) throw new TypeError("rows must be an array");
  if (!emailField) throw new TypeError("emailField is required");

  const firstByEmail = new Map();
  const results = rows.map((row, index) => {
    const originalEmail = String(row?.[emailField] ?? "").trim();
    const normalizedEmail = normalizeEmail(originalEmail);
    const base = {
      index,
      rowNumber: Number.isInteger(row?.rowNumber) ? row.rowNumber : index + 1,
      originalEmail,
      normalizedEmail,
    };

    if (!isEmail(originalEmail)) {
      return { ...base, status: RECIPIENT_STATUS.SKIPPED_INVALID, duplicateOf: null };
    }

    if (firstByEmail.has(normalizedEmail)) {
      return {
        ...base,
        status: RECIPIENT_STATUS.SKIPPED_DUPLICATE,
        duplicateOf: firstByEmail.get(normalizedEmail),
      };
    }

    firstByEmail.set(normalizedEmail, index);
    return { ...base, status: RECIPIENT_STATUS.READY, duplicateOf: null };
  });

  const counts = results.reduce(
    (summary, result) => {
      summary.total += 1;
      summary[result.status] += 1;
      return summary;
    },
    { total: 0, ready: 0, skipped_invalid: 0, skipped_duplicate: 0 },
  );

  return { results, counts };
}
