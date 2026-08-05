import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { parseArgs, routeTask } from "../../scripts/route-codex-skills.mjs";

const catalog = JSON.parse(
  readFileSync(
    new URL("../../config/codex/skill-router/routes.json", import.meta.url),
    "utf8",
  ),
);

function route(task) {
  return routeTask(task, catalog, new Map());
}

test("explicit skill invocation overrides inferred routing", () => {
  const result = route("Utilise $seo-audit pour examiner le site");

  assert.equal(result.primary.id, "explicit-skill");
  assert.equal(result.resolved[0].skill, "seo-audit");
  assert.equal(result.resolved[0].mode, "full");
});

test("bug fixing selects diagnosis and TDD verification fragments", () => {
  const result = route("Corrige le bug de connexion et vérifie le correctif");

  assert.equal(result.primary.id, "debugging");
  assert.equal(result.resolved[0].skill, "systematic-debugging");
  assert.ok(
    result.resolved.some(
      ({ sourceSkill, fragment }) =>
        sourceSkill === "test-driven-development" &&
        fragment === "red-green-refactor",
    ),
  );
  assert.ok(
    result.resolved.some(
      ({ sourceSkill, fragment }) =>
        sourceSkill === "verification-before-completion" &&
        fragment === "evidence-gate",
    ),
  );
});

test("frontend audit prefers impeccable over generic implementation", () => {
  const result = route(
    "Audite et améliore l'interface existante, son accessibilité et son responsive",
  );

  assert.equal(result.primary.id, "frontend-polish");
  assert.equal(result.resolved[0].skill, "impeccable");
});

test("skill authoring selects the complete authoring skills", () => {
  const result = route(
    "Crée une nouvelle skill Codex avec un fichier SKILL.md",
  );

  assert.equal(result.primary.id, "skill-authoring");
  assert.deepEqual(
    result.resolved.slice(0, 2).map(({ skill, mode }) => [skill, mode]),
    [
      ["skill-creator", "full"],
      ["writing-skills", "full"],
    ],
  );
});

test("skill routing orchestrator requests select skill authoring", () => {
  const result = route(
    "Mets en place un orchestrateur qui déclenche un routage des skills",
  );

  assert.equal(result.primary.id, "skill-authoring");
  assert.equal(result.resolved[0].skill, "skill-creator");
});

test("base64 task input preserves protected governance wording", () => {
  const task = "Modifie AGENTS.md pour router les skills";
  const options = parseArgs([
    "--task-base64",
    Buffer.from(task).toString("base64"),
    "--json",
  ]);

  assert.equal(options.task, task);
  assert.equal(options.json, true);
});

test("implementation routes include full TDD and completion evidence", () => {
  const result = route("Ajoute une fonctionnalite de recherche");

  assert.equal(result.primary.id, "implementation");
  assert.ok(result.capabilities.includes("implementation"));
  assert.ok(
    result.resolved.some(
      ({ skill, mode }) =>
        skill === "test-driven-development" && mode === "full",
    ),
  );
  assert.ok(
    result.resolved.some(
      ({ sourceSkill, fragment }) =>
        sourceSkill === "verification-before-completion" &&
        fragment === "evidence-gate",
    ),
  );
});

test("diagnosis-only tasks do not receive implementation gates", () => {
  const result = route("Diagnostique la cause racine du bug de connexion");

  assert.equal(result.primary.id, "debugging");
  assert.ok(!result.capabilities.includes("implementation"));
  assert.ok(
    !result.resolved.some(
      ({ sourceSkill }) =>
        sourceSkill === "test-driven-development" ||
        sourceSkill === "verification-before-completion",
    ),
  );
});

test("publication requests keep completion evidence", () => {
  const result = route("Publie sur GitHub");

  assert.equal(result.primary.id, "github-publish");
  assert.ok(
    result.resolved.some(
      ({ sourceSkill, fragment }) =>
        sourceSkill === "verification-before-completion" &&
        fragment === "evidence-gate",
    ),
  );
});

test("unmatched tasks return a low-confidence metadata fallback", () => {
  const result = route("Calcule 17 multiplié par 23");

  assert.equal(result.primary, null);
  assert.equal(result.confidence, "low");
  assert.deepEqual(result.resolved, []);
  assert.match(result.fallback, /métadonnées/i);
});
