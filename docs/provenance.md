# Provenance and sanitization

MailFlow Lab was designed from operational lessons learned in a private application owned by the project author. This public repository is a new, reduced implementation of a generic workflow; it is not a copy of the private repository or its history.

## Included concepts

- positive-only rate and backoff configuration;
- non-negative retry configuration;
- email validation and normalized duplicate detection;
- escaped and raw template variables;
- deterministic dry-run preview and row reconciliation.

## Deliberately excluded

- the private project name and source paths;
- private Git history and commit metadata;
- environment files, credentials, endpoints, logs, uploads, and runtime state;
- real recipient data, templates, screenshots, and business-specific copy;
- frontend, server, SMTP delivery, retry loop, and resume persistence;
- original package lockfiles and installed dependencies.

## Data policy

Only the contents of this sanitized public tree may be supplied to an external model provider. The private source tree remains outside the agent workspace. Fixtures are synthetic and use reserved `.test` domains.

## License boundary

The implementation in this repository is published by BrianV under Apache-2.0. Any future imported dependency or copied asset requires a separate license and attribution review.
