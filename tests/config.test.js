import test from "node:test";
import assert from "node:assert/strict";

import { loadRuntimeConfig } from "../src/config.js";

test("MAX_RETRIES accepts zero", () => {
  assert.equal(loadRuntimeConfig({ MAX_RETRIES: "0" }).maxRetries, 0);
});

test("MAX_RETRIES accepts a positive integer", () => {
  assert.equal(loadRuntimeConfig({ MAX_RETRIES: "5" }).maxRetries, 5);
});

test("MAX_RETRIES rejects negative, fractional, empty, and invalid values", () => {
  for (const value of ["-1", "1.5", "", "invalid"]) {
    assert.equal(loadRuntimeConfig({ MAX_RETRIES: value }).maxRetries, 3);
  }
});

test("rate and backoff remain positive-only", () => {
  const config = loadRuntimeConfig({ RATE_PER_MINUTE: "0", RETRY_BACKOFF_MS: "-2" });
  assert.equal(config.ratePerMinute, 20);
  assert.equal(config.retryBackoffMs, 5000);
});
