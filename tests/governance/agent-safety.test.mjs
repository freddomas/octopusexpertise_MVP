import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const root = new URL("../../", import.meta.url);

function read(path) {
  return readFile(new URL(path, root), "utf8");
}

function section(markdown, heading) {
  const start = markdown.indexOf(heading);
  assert.notEqual(start, -1, `Section absente: ${heading}`);
  const next = markdown.indexOf("\n## ", start + heading.length);
  return markdown.slice(start, next === -1 ? undefined : next);
}

test("agent policy is concise and evidence-first", async () => {
  const agents = await read("AGENTS.md");
  const safety = section(agents, "## Fiabilité agentique — Always_Best");

  assert.ok(Buffer.byteLength(agents) <= 6_144);
  assert.match(safety, /prémisse matérielle/);
  assert.match(safety, /fait observé, inférence/);
  assert.match(safety, /deux échecs identiques/);
  assert.match(safety, /validation complète par état du worktree/);
  assert.match(safety, /preuve fraîche/);
});

test("project lifecycle hooks remain empty", async () => {
  const hooks = JSON.parse(await read(".codex/hooks.json"));

  assert.deepEqual(hooks, { hooks: {} });
});

test("delivery gates are wired and protected", async () => {
  const packageJson = JSON.parse(await read("package.json"));
  const workflow = await read(".github/workflows/ci.yml");
  const protection = JSON.parse(
    await read("config/github/main-protection.json"),
  );

  for (const command of [
    "format:check",
    "skills:check",
    "lint",
    "npm test",
    "build",
  ]) {
    assert.ok(packageJson.scripts.verify.includes(command));
  }

  assert.match(
    workflow,
    /^  group: verify-\$\{\{ github\.workflow \}\}-\$\{\{ github\.event\.pull_request\.number \|\| github\.ref \}\}$/m,
  );
  assert.match(workflow, /^  cancel-in-progress: true$/m);
  assert.match(workflow, /^      - run: npm run verify$/m);

  assert.deepEqual(protection.required_status_checks, {
    strict: true,
    contexts: ["verify"],
  });
  assert.equal(protection.enforce_admins, true);
  assert.equal(
    protection.required_pull_request_reviews.require_code_owner_reviews,
    false,
  );
  assert.ok(
    !("dismissal_restrictions" in protection.required_pull_request_reviews),
  );
  assert.equal(protection.required_linear_history, true);
  assert.equal(protection.allow_force_pushes, false);
  assert.equal(protection.allow_deletions, false);
});
