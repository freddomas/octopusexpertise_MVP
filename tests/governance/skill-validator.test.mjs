import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

import { availableExternalSkills } from "../../scripts/validate-codex-skills.mjs";

test("skill validation is portable without host-global skills", () => {
  const codexHome = mkdtempSync(join(tmpdir(), "octopus-codex-"));
  try {
    assert.deepEqual(availableExternalSkills(codexHome), []);
  } finally {
    rmSync(codexHome, { recursive: true, force: true });
  }
});
