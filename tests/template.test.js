import test from "node:test";
import assert from "node:assert/strict";

import {
  extractVariables,
  findMissingMappings,
  renderTemplate,
} from "../src/template.js";

test("extractVariables keeps first-seen order without duplicates", () => {
  assert.deepEqual(
    extractVariables("{{name}} / {{{html}}} / {{name}}"),
    ["name", "html"],
  );
});

test("double braces escape HTML and triple braces preserve raw content", () => {
  const output = renderTemplate("{{safe}}|{{{raw}}}", {
    safe: '<a href="/">link</a>',
    raw: "<strong>raw</strong>",
  });

  assert.equal(
    output,
    "&lt;a href=&quot;/&quot;&gt;link&lt;/a&gt;|<strong>raw</strong>",
  );
});

test("mapping selects fields and missing mappings are reported", () => {
  assert.equal(
    renderTemplate("Hello {{customer}}", { displayName: "Lan" }, { customer: "displayName" }),
    "Hello Lan",
  );
  assert.deepEqual(
    findMissingMappings(["customer", "order"], { customer: "displayName" }, ["displayName"]),
    ["order"],
  );
});
