import test from "node:test";
import assert from "node:assert/strict";

import { buildDryRun } from "../src/dry-run.js";

test("dry run reconciles every row and never calls the network", () => {
  const report = buildDryRun(
    [
      { name: "An", email: "an@example.test" },
      { name: "Duplicate", email: "AN@example.test" },
      { name: "Invalid", email: "invalid" },
    ],
    { subject: "Hello {{name}}", html: "<p>{{name}}</p>" },
  );

  assert.equal(report.mode, "dry-run");
  assert.equal(report.networkCalls, 0);
  assert.equal(report.counts.total, 3);
  assert.equal(
    report.counts.ready +
      report.counts.skipped_duplicate +
      report.counts.skipped_invalid,
    report.counts.total,
  );
  assert.equal(report.messages[0].recipient, "an*@example.test");
  assert.equal(report.messages[1].preview, null);
  assert.equal(report.messages[2].preview, null);
});
