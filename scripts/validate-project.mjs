import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const required = [
  "README.md",
  "README.vi.md",
  "LICENSE",
  "NOTICE",
  "SECURITY.md",
  "AGENTS.md",
  "package.json",
  "fixtures/recipients.json",
  "fixtures/template.html",
  "src/config.js",
  "src/dry-run.js",
  "src/email.js",
  "src/recipients.js",
  "src/template.js",
  "tests/config.test.js",
  "tests/dry-run.test.js",
  "tests/recipients.test.js",
  "tests/template.test.js",
];

const errors = [];
for (const file of required) {
  try {
    await access(path.join(root, file));
  } catch {
    errors.push(`Missing required file: ${file}`);
  }
}

for (const file of ["package.json", "fixtures/recipients.json"]) {
  try {
    JSON.parse(await readFile(path.join(root, file), "utf8"));
  } catch (error) {
    errors.push(`Invalid JSON in ${file}: ${error.message}`);
  }
}

const forbiddenPatterns = [
  { label: "absolute private Windows path", pattern: /[a-z]:\\(?:users|projects)\\/i },
  { label: "private key block", pattern: /-----begin (?:rsa |ec |openssh )?private key-----/i },
  {
    label: "credential-like assignment",
    pattern: /(?:api[_-]?key|smtp[_-]?pass|password|secret|token)\s*[:=]\s*["'][^"']{8,}["']/i,
  },
];
for (const file of required) {
  try {
    const content = await readFile(path.join(root, file), "utf8");
    for (const { label, pattern } of forbiddenPatterns) {
      if (pattern.test(content)) errors.push(`Potential ${label} in ${file}`);
    }
  } catch {
    // Missing files are reported above; binary files are not in the allowlist.
  }
}

if (errors.length) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Project structure is valid (${required.length} required files).`);
}
