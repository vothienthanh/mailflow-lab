# MFL-001: Skip duplicate email recipients

## Status

Approved learning contract for the initial public baseline.

## Problem

A recipient list can contain the same address more than once. Processing each row can create duplicate work and misleading totals.

## Business rules

1. Normalize email identity by trimming whitespace and converting to lowercase.
2. Validate the original trimmed address before duplicate detection.
3. The first valid occurrence wins.
4. Later normalized matches receive `skipped_duplicate` and reference the first input index.
5. Invalid or empty addresses receive `skipped_invalid` and do not reserve a duplicate key.
6. Every input row appears once in the result and counts reconcile to the total.
7. Dry-run masks recipient output and performs no network call.

## Acceptance criteria

- **AC-1:** Addresses that differ only by case or surrounding whitespace are duplicates.
- **AC-2:** The first valid occurrence is `ready`; later matches are `skipped_duplicate`.
- **AC-3:** Empty and malformed addresses are `skipped_invalid`, not duplicates.
- **AC-4:** Unique valid rows preserve input order and source row numbers.
- **AC-5:** Ready plus skipped counts equal total input rows.
- **AC-6:** The demo reports `networkCalls: 0` and uses synthetic fixtures only.
- **AC-7:** `MAX_RETRIES=0` is preserved while invalid retry values fall back to three.

## Non-goals

- sending email;
- importing spreadsheets;
- cross-job suppression;
- fuzzy or provider-specific alias matching;
- merging data from duplicate rows;
- user-selectable first-wins/last-wins behavior;
- UI, persistence, retry execution, or resume.
