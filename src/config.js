function positiveNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function nonNegativeInteger(value, fallback) {
  if (value === "" || value === null || value === undefined) return fallback;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
}

export function loadRuntimeConfig(environment = {}) {
  return {
    ratePerMinute: positiveNumber(environment.RATE_PER_MINUTE, 20),
    maxRetries: nonNegativeInteger(environment.MAX_RETRIES, 3),
    retryBackoffMs: positiveNumber(environment.RETRY_BACKOFF_MS, 5000),
  };
}
