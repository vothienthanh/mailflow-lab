const SIMPLE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(value) {
  return String(value ?? "").trim().toLowerCase();
}

export function isEmail(value) {
  return SIMPLE_EMAIL.test(String(value ?? "").trim());
}

export function maskEmail(value) {
  const email = normalizeEmail(value);
  const separator = email.indexOf("@");
  if (separator < 1) return "[invalid]";

  const local = email.slice(0, separator);
  const domain = email.slice(separator + 1);
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}${"*".repeat(Math.max(1, local.length - visible.length))}@${domain}`;
}
