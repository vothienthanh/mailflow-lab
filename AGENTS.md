# Repository instructions

MailFlow Lab is a sanitized, dry-run-only learning project.

## Boundaries

- Never add or read secrets, `.env`, private source paths, real recipient data, logs, uploads, or runtime state.
- Do not add SMTP, webhooks, analytics, or other network side effects unless an approved future spec explicitly changes the project boundary.
- Do not push, merge, deploy, publish, or create releases.
- Work only from an approved feature spec and within the named files.
- Preserve first-valid-occurrence duplicate behavior unless the spec changes it.
- Keep fixtures synthetic and use the reserved `.test` domain.
- A completion message is not evidence; run `npm run check`.

## Required completion evidence

- changed files;
- acceptance criteria and matching tests;
- exact commands and exit codes;
- remaining risks and untested behavior;
- confirmation that no secret or real recipient data was added.
