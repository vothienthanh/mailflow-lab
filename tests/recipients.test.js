import test from "node:test";
import assert from "node:assert/strict";

import { prepareRecipients, RECIPIENT_STATUS } from "../src/recipients.js";

test("first normalized email wins and later matches are duplicates", () => {
  const rows = [
    { rowNumber: 10, email: "First@Example.test" },
    { rowNumber: 11, email: " first@example.test " },
    { rowNumber: 12, email: "unique@example.test" },
  ];

  const prepared = prepareRecipients(rows);

  assert.deepEqual(
    prepared.results.map(({ status, duplicateOf }) => ({ status, duplicateOf })),
    [
      { status: RECIPIENT_STATUS.READY, duplicateOf: null },
      { status: RECIPIENT_STATUS.SKIPPED_DUPLICATE, duplicateOf: 0 },
      { status: RECIPIENT_STATUS.READY, duplicateOf: null },
    ],
  );
  assert.deepEqual(prepared.counts, {
    total: 3,
    ready: 2,
    skipped_invalid: 0,
    skipped_duplicate: 1,
  });
});

test("invalid rows do not reserve a duplicate key", () => {
  const prepared = prepareRecipients([
    { email: "" },
    { email: "" },
    { email: "not-an-email" },
  ]);

  assert.equal(prepared.counts.skipped_invalid, 3);
  assert.equal(prepared.counts.skipped_duplicate, 0);
});

test("row order and source row numbers are preserved", () => {
  const prepared = prepareRecipients([
    { rowNumber: 7, email: "a@example.test" },
    { rowNumber: 20, email: "b@example.test" },
  ]);

  assert.deepEqual(prepared.results.map((result) => result.rowNumber), [7, 20]);
  assert.deepEqual(prepared.results.map((result) => result.index), [0, 1]);
});
