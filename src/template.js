const VARIABLE_PATTERN = /\{\{\{\s*([^{}]+?)\s*\}\}\}|\{\{\s*([^{}]+?)\s*\}\}/g;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function extractVariables(content) {
  const variables = new Set();
  for (const match of String(content ?? "").matchAll(VARIABLE_PATTERN)) {
    variables.add(match[1] ?? match[2]);
  }
  return [...variables];
}

export function renderTemplate(content, values, mapping = {}) {
  return String(content ?? "").replace(
    VARIABLE_PATTERN,
    (_match, rawVariable, escapedVariable) => {
      const variable = rawVariable ?? escapedVariable;
      const field = mapping[variable] ?? variable;
      const value = values?.[field] ?? "";
      return rawVariable ? String(value) : escapeHtml(value);
    },
  );
}

export function findMissingMappings(variables, mapping, availableFields) {
  const fields = new Set(availableFields);
  return variables.filter((variable) => !fields.has(mapping[variable] ?? variable));
}
