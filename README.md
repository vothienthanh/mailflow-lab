# MailFlow Lab

MailFlow Lab is a sanitized, dry-run-only reference project for learning how to build software with bounded AI coding agents and deterministic evidence.

It focuses on one realistic workflow: prepare recipient data, reject invalid addresses, skip normalized duplicates, render a safe preview, and reconcile every input row. It contains no SMTP client, production endpoint, credentials, customer data, or external network path.

Maintained by [BrianV](https://github.com/vothienthanh). This repository is the first proving ground for [BrianV Agent Factory](https://github.com/vothienthanh/brianv-agent-factory).

## What it demonstrates

- `MAX_RETRIES=0` is a valid configuration, while rate and backoff remain positive-only;
- duplicate identity uses trimmed, lowercase email comparison;
- the first valid occurrence wins and later occurrences become `skipped_duplicate`;
- invalid rows remain `skipped_invalid` and do not reserve duplicate keys;
- template values are HTML-escaped by default, with explicit raw braces available;
- dry-run output masks recipients and reports zero network calls;
- each claim is covered by a deterministic test.

## Quick start

Requires Node.js 20 or newer. There are no third-party runtime dependencies.

```bash
npm install
npm run check
```

Run the synthetic example:

```bash
npm run demo
```

The demo reads only files in `fixtures/`, prints a masked preview, and never sends a message.

## Project map

```text
fixtures/        synthetic recipients and template
specs/           approved behavior contract for the learning feature
src/             deterministic domain logic
tests/           Node built-in tests
scripts/         demo and structural validation
docs/            provenance and learning notes
```

## Safety boundary

- Do not add SMTP, webhook, analytics, or another network integration to the initial lab.
- Do not add `.env`, credentials, private source paths, real addresses, logs, uploads, or runtime state.
- AI agents work in a disposable checkout and may not push, merge, deploy, or publish.
- Model output is a claim; `npm run check` is the local evidence gate.

## Project status

Experimental learning lab. The current scope is the deterministic feature slice documented in [specs/MFL-001-skip-duplicates.md](specs/MFL-001-skip-duplicates.md). A UI and real delivery adapter are intentionally out of scope.

## License

Copyright 2026 BrianV. Licensed under Apache-2.0. See [docs/provenance.md](docs/provenance.md) for sanitization and provenance boundaries.
