import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildDryRun } from "../src/dry-run.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rows = JSON.parse(await readFile(path.join(root, "fixtures/recipients.json"), "utf8"));
const html = await readFile(path.join(root, "fixtures/template.html"), "utf8");

const report = buildDryRun(
  rows,
  { subject: "Welcome, {{name}}", html },
  { emailField: "email" },
);

console.log(JSON.stringify(report, null, 2));
