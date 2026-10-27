# Security policy

## Supported versions

This project is pre-1.0. Security fixes apply to the latest revision on `main`.

## Reporting

Do not open a public issue containing a secret, personal data, or a private-source detail. Use GitHub private vulnerability reporting after it is enabled, or contact the owner through the private contact method on the [BrianV profile](https://github.com/vothienthanh).

## Current boundary

MailFlow Lab is dry-run-only. It has no SMTP client, credential loader, external service, or network requirement. Synthetic fixtures use the reserved `.test` domain. A change that introduces external effects requires a new approved specification and security review.
