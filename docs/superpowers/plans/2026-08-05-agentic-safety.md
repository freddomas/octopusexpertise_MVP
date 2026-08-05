# Sécurité agentique sans surcharge — Plan d'implémentation

> **Pour l’exécution :** travailler dans le fil principal. Utiliser un sous-agent
> uniquement pour une tâche indépendante avec gain démontré.

**Objectif :** réduire les erreurs agentiques et empêcher l’intégration dans
`main` sans vérification réussie.

**Architecture :** une capacité `implementation` unique pilote TDD et la preuve
de fin. `AGENTS.md` porte les règles comportementales. `npm run verify`, GitHub
Actions et la protection de `main` portent les contrôles techniques.

**Outils :** Node.js 22, `node:test`, JSON, Markdown, GitHub Actions, GitHub CLI.

## Contraintes

- Aucune dépendance npm supplémentaire.
- Aucun hook projet `PreToolUse`, `PostToolUse`, `UserPromptSubmit` ou
  `Stop`.
- Conserver `.codex/hooks.json` égal à `{ "hooks": {} }`.
- Limiter `AGENTS.md` à 6 144 octets.
- Préserver les changements hors périmètre et indexer uniquement les chemins
  listés.
- Les règles comportementales réduisent le risque ; seul le gate GitHub bloque
  techniquement une intégration.
- Le dépôt mono-collaborateur n’impose aucune approbation impossible à
  auto-obtenir ; le gate protège les régressions accidentelles.
- Toute mutation GitHub et toute fusion exigent une autorisation externe
  explicite.

## Fichiers

### Créer

- `config/github/main-protection.json`
- `tests/governance/agent-safety.test.mjs`

### Modifier

- `AGENTS.md`
- `package.json`
- `.github/workflows/ci.yml`
- `config/codex/skill-router/routes.json`
- `scripts/route-codex-skills.mjs`
- `tests/governance/skill-router.test.mjs`

### Versionner sans modification

- `config/codex/skill-router/fragments/evidence-gate.md`
- `config/codex/skill-router/fragments/implementation-contract.md`
- `config/codex/skill-router/fragments/red-green-refactor.md`
- `docs/superpowers/plans/2026-08-05-agentic-safety.md`

### Ne pas modifier

- `.codex/hooks.json`
- `.git/hooks/*`
- `/root/.codex/*`
- `package-lock.json`
- `README.md`
- `apps/*`
- les autres fichiers de `docs/superpowers/plans/`

## Préparation

```bash
test "$(git branch --show-current)" = "main"
git diff --cached --quiet
git switch -c feat/agentic-safety
```

---

### Tâche 1 — Centraliser le routage d’implémentation

**Fichiers :**

- Modifier : `scripts/route-codex-skills.mjs`
- Modifier : `config/codex/skill-router/routes.json`
- Modifier : `tests/governance/skill-router.test.mjs`

**Interfaces :**

- `parseArgs(argv) -> { json, task, catalog, help? }`
- `routeTask(task, catalog, skills) -> RouteResult`
- `RouteResult.capabilities -> string[]`

- [ ] **1. Remplacer les sous-processus des tests par l’import direct**

Dans `tests/governance/skill-router.test.mjs`, supprimer
`node:child_process` et définir :

```javascript
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
```

Remplacer le test Base64 par :

```javascript
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
```

Ajouter :

```javascript
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
```

- [ ] **2. Observer RED**

```bash
npm run skills:route:test
```

Attendu : échec, car `parseArgs` et `routeTask` ne sont pas exportées et la
capacité `implementation` n’existe pas.

- [ ] **3. Exporter le routeur pur**

Dans `scripts/route-codex-skills.mjs`, ajouter :

```javascript
function detectCapabilities(catalog, text) {
  return new Set(
    Object.entries(catalog.capabilities ?? {})
      .filter(([, rule]) => matches(text, rule) !== null)
      .map(([name]) => name),
  );
}

function eligible(entries, activeCapabilities) {
  return entries.filter(({ requires = [] }) =>
    requires.every((name) => activeCapabilities.has(name)),
  );
}
```

Remplacer `rank(entries, text)` par :

```javascript
function rank(entries, text, activeCapabilities = new Set()) {
  return eligible(entries, activeCapabilities)
    .map((entry, index) => {
      const matched = matches(text, entry.match);
      if (!matched) return null;
      const specificity = matched.reduce(
        (total, term) => total + term.split(" ").length,
        0,
      );
      return { ...entry, index, matched, score: entry.priority + specificity };
    })
    .filter(Boolean)
    .sort(
      (left, right) => right.score - left.score || left.index - right.index,
    );
}
```

Dans `routeTask`, calculer la capacité avant les routes :

```javascript
const text = normalize(task);
const activeCapabilities = detectCapabilities(catalog, text);
const explicit = explicitSelection(task);
const overlays = rank(catalog.overlays ?? [], text, activeCapabilities);
```

Utiliser aussi `activeCapabilities` pour la route primaire :

```javascript
: (rank(catalog.routes ?? [], text, activeCapabilities)[0] ?? null);
```

Ajouter au résultat :

```javascript
capabilities: [...activeCapabilities],
```

Encapsuler l’exécution CLI :

```javascript
function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(
      'Usage: npm run skills:route -- --task "<tâche>" [--json]\n' +
        "       npm run skills:route -- --task-base64 <base64> [--json]\n",
    );
    return;
  }
  if (!options.task.trim()) {
    process.stderr.write(
      "Une tâche non vide est requise via --task ou en argument.\n",
    );
    process.exitCode = 2;
    return;
  }
  if (!existsSync(options.catalog)) {
    process.stderr.write(`Catalogue introuvable: ${options.catalog}\n`);
    process.exitCode = 2;
    return;
  }

  const catalog = JSON.parse(readFileSync(options.catalog, "utf8"));
  const result = routeTask(options.task, catalog, discoverSkills());
  if (options.json)
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  else printHuman(result);
}

if (resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  main();
}

export { parseArgs, routeTask };
```

- [ ] **4. Définir la capacité unique**

Dans `config/codex/skill-router/routes.json`, ajouter à la racine :

```json
"capabilities": {
  "implementation": {
    "any": [
      "corrige",
      "repare",
      "fixe",
      "fix",
      "implemente",
      "implement",
      "mets en place",
      "met en place",
      "developpe",
      "develop a feature",
      "develop the feature",
      "ameliore",
      "improve",
      "ajoute une fonctionnalite",
      "add feature",
      "ajoute du code",
      "add code",
      "construis",
      "build a feature",
      "build the feature",
      "refactorise",
      "refactor",
      "modifie le code",
      "update the code",
      "supprime du code",
      "remove code"
    ],
    "none": [
      "analyse seulement",
      "diagnostique seulement",
      "sans modifier",
      "documentation uniquement",
      "texte uniquement",
      "skill.md",
      "skill codex",
      "nouvelle skill",
      "orchestrateur de skill",
      "routage des skills"
    ]
  }
}
```

Remplacer la route `implementation` par :

```json
{
  "id": "implementation",
  "priority": 40,
  "requires": ["implementation"],
  "match": {},
  "select": [{ "skill": "test-driven-development", "mode": "full" }]
}
```

Dans l’overlay `tdd-cycle`, remplacer `match` par :

```json
"requires": ["implementation"],
"match": {}
```

Conserver `verification-gate` pour les demandes explicites de vérification,
publication et livraison. Ajouter après lui :

```json
{
  "id": "implementation-verification-gate",
  "priority": 9,
  "requires": ["implementation"],
  "match": {},
  "select": [
    {
      "sourceSkill": "verification-before-completion",
      "fragment": "evidence-gate",
      "mode": "fragment",
      "path": "config/codex/skill-router/fragments/evidence-gate.md"
    }
  ]
}
```

- [ ] **5. Observer GREEN**

```bash
npm run skills:route:test
```

Attendu : tous les tests réussissent sans créer de processus enfant.

---

### Tâche 2 — Ajouter le contrat agentique concis

**Fichiers :**

- Créer : `tests/governance/agent-safety.test.mjs`
- Modifier : `AGENTS.md`
- Modifier : `package.json`

**Interfaces :**

- Budget : `AGENTS.md <= 6_144` octets.
- Gate : `npm run governance:test`.

- [ ] **1. Écrire le test en échec**

Créer `tests/governance/agent-safety.test.mjs` :

```javascript
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
```

- [ ] **2. Observer RED**

```bash
node --test tests/governance/agent-safety.test.mjs
```

Attendu : échec, car la section de fiabilité n’existe pas.

- [ ] **3. Préparer le permis et consolider `AGENTS.md`**

```bash
node /root/.codex/hooks/governance-edit-guard.mjs prepare --target AGENTS.md --anchor '## Règle Always_Best' --max-changed-lines 80
```

Remplacer `Règle Always_Best`, `Outillage et délestage` et `Multi-agent`
par :

```markdown
## Fiabilité agentique — Always_Best

- Vérifier toute prémisse matérielle dans l’état courant avant d’agir ; mémoire,
  index, graphe et plan ne sont que des pistes.
- Distinguer fait observé, inférence et information non vérifiée ; ne jamais
  baser une mutation sur cette dernière.
- Ne retenter une opération échouée qu’après une preuve nouvelle ou un
  changement pertinent. Après deux échecs identiques, diagnostiquer et changer
  d’approche.
- Ne lancer qu’une validation complète par état du worktree ; la relancer après
  un changement pertinent ou dans un environnement différent.
- Ne déclarer une réussite qu’avec une preuve fraîche et proportionnée.
- Choisir la solution sensiblement meilleure et la plus simple ; outil ou
  sous-agent uniquement avec gain démontré et tâche indépendante. Cette règle
  s’impose à tout `AGENTS.md` imbriqué.
```

Dans `Git`, remplacer la publication directe par :

```markdown
- Travailler sur une branche dédiée et publier par pull request vers `main`.
- Fusionner uniquement après réussite du check requis `verify` sur le SHA de la
  pull request.
- Après fusion, vérifier `verify` sur le SHA final de `main`.
```

- [ ] **4. Enregistrer tous les tests de gouvernance**

Dans `package.json`, définir :

```json
"test": "npm run governance:test && npm run test --workspaces --if-present",
"governance:test": "node --test tests/governance/*.test.mjs",
"skills:route:test": "node --test tests/governance/skill-router.test.mjs",
"format:check": "prettier --check apps docs README.md AGENTS.md package.json compose.yaml scripts/route-codex-skills.mjs tests/governance config .github"
```

- [ ] **5. Observer GREEN**

```bash
wc -c AGENTS.md
npm run governance:test
```

Attendu : `AGENTS.md` ne dépasse pas 6 144 octets et tous les tests de
gouvernance réussissent.

---

### Tâche 3 — Ajouter la CI et la protection reproductible de `main`

**Fichiers :**

- Modifier : `.github/workflows/ci.yml`
- Créer : `config/github/main-protection.json`
- Modifier : `tests/governance/agent-safety.test.mjs`

**Interfaces :**

- Check requis : `verify`.
- Configuration distante : `PUT /branches/main/protection`.

- [ ] **1. Étendre le test en échec**

Ajouter à `tests/governance/agent-safety.test.mjs` :

```javascript
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
  assert.equal(protection.required_linear_history, true);
  assert.equal(protection.allow_force_pushes, false);
  assert.equal(protection.allow_deletions, false);
});
```

- [ ] **2. Observer RED**

```bash
npm run governance:test
```

Attendu : échec, car la protection et la concurrence CI manquent.

- [ ] **3. Définir le workflow**

Remplacer `.github/workflows/ci.yml` par :

```yaml
name: Verify

on:
  push:
    branches: [main]
  pull_request:
  workflow_dispatch:

concurrency:
  group: verify-${{ github.workflow }}-${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true

permissions:
  contents: read

jobs:
  verify:
    name: verify
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run verify
```

- [ ] **4. Définir la protection idempotente**

Créer `config/github/main-protection.json` :

```json
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["verify"]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismissal_restrictions": {},
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "required_approving_review_count": 0,
    "require_last_push_approval": false
  },
  "restrictions": null,
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": true,
  "lock_branch": false,
  "allow_fork_syncing": true
}
```

- [ ] **5. Observer GREEN**

```bash
npm run governance:test
```

Attendu : tous les tests de gouvernance réussissent.

---

### Tâche 4 — Vérifier, publier et protéger `main`

**Fichiers :**

- Vérifier et indexer uniquement les chemins listés dans ce plan.
- Modifier GitHub uniquement après autorisation explicite.

- [ ] **1. Actualiser le graphe puis vérifier l’état final**

```bash
graphify update .
npm run governance:test
npm run skills:check
npm run verify
git diff --check
```

Attendu : toutes les commandes réussissent.

- [ ] **2. Indexer explicitement**

```bash
git add AGENTS.md package.json .github/workflows/ci.yml config/codex/skill-router/routes.json config/codex/skill-router/fragments/evidence-gate.md config/codex/skill-router/fragments/implementation-contract.md config/codex/skill-router/fragments/red-green-refactor.md config/github/main-protection.json scripts/route-codex-skills.mjs tests/governance/skill-router.test.mjs tests/governance/agent-safety.test.mjs docs/superpowers/plans/2026-08-05-agentic-safety.md
git diff --cached --check
git diff --cached --name-only
```

Attendu : seuls les chemins explicitement listés sont indexés.

- [ ] **3. Commiter et ouvrir la pull request**

```bash
git commit -m "chore: enforce agentic safety gates"
git push -u origin feat/agentic-safety
gh pr create --base main --head feat/agentic-safety --title "Enforce agentic safety gates" --body "Adds deterministic implementation routing, evidence-first governance, cancelable verification, and protected main."
```

- [ ] **4. Vérifier le SHA de la pull request**

```bash
pr_number="$(gh pr view --json number --jq .number)"
pr_sha="$(gh pr view "$pr_number" --json headRefOid --jq .headRefOid)"
test "$pr_sha" = "$(git rev-parse HEAD)"
gh pr checks "$pr_number" --watch --fail-fast
verify_count="$(gh api "repos/freddomas/octopusexpertise_MVP/commits/$pr_sha/check-runs" --jq ".check_runs | map(select(.name == \\"verify\\" and .head_sha == \\"$pr_sha\\" and .conclusion == \\"success\\")) | length")"
test "$verify_count" -ge 1
```

- [ ] **5. Appliquer et vérifier la protection de `main`**

```bash
gh api --method PUT repos/freddomas/octopusexpertise_MVP/branches/main/protection --header "Accept: application/vnd.github+json" --input config/github/main-protection.json
gh api repos/freddomas/octopusexpertise_MVP/branches/main/protection --jq 'if .required_status_checks.strict and (.required_status_checks.contexts | index("verify") != null) and .enforce_admins.enabled and (.required_pull_request_reviews.require_code_owner_reviews | not) and .required_linear_history.enabled and (.allow_force_pushes.enabled | not) and (.allow_deletions.enabled | not) then "main protection: OK" else error("main protection mismatch") end'
```

- [ ] **6. Mettre la branche à jour et revérifier**

```bash
gh pr update-branch "$pr_number"
pr_sha="$(gh pr view "$pr_number" --json headRefOid --jq .headRefOid)"
gh pr checks "$pr_number" --watch --fail-fast
verify_count="$(gh api "repos/freddomas/octopusexpertise_MVP/commits/$pr_sha/check-runs" --jq ".check_runs | map(select(.name == \\"verify\\" and .head_sha == \\"$pr_sha\\" and .conclusion == \\"success\\")) | length")"
test "$verify_count" -ge 1
```

- [ ] **7. Fusionner puis vérifier le SHA final de `main`**

```bash
gh pr merge "$pr_number" --squash --delete-branch
git fetch origin main
main_sha="$(git rev-parse origin/main)"
remote_sha="$(git ls-remote origin refs/heads/main | cut -f1)"
test "$main_sha" = "$remote_sha"

main_run_id=""
for attempt in $(seq 1 60); do
  main_run_id="$(gh run list --workflow ci.yml --commit "$main_sha" --event push --limit 1 --json databaseId --jq '.[0].databaseId')"
  test -n "$main_run_id" && break
  sleep 5
done
test -n "$main_run_id"
gh run watch "$main_run_id" --exit-status

verify_count="$(gh api "repos/freddomas/octopusexpertise_MVP/commits/$main_sha/check-runs" --jq ".check_runs | map(select(.name == \\"verify\\" and .head_sha == \\"$main_sha\\" and .conclusion == \\"success\\")) | length")"
test "$verify_count" -ge 1
```

## Critères d’acceptation

- Le routeur applique TDD et `evidence-gate` à toute demande reconnue comme
  implémentation.
- Une demande de diagnostic seule ne reçoit aucun gate d’implémentation.
- Les tests du routeur n’exécutent aucun processus enfant.
- `AGENTS.md` ne dépasse pas 6 144 octets.
- Aucun hook projet ni dépendance npm n’est ajouté.
- `npm run verify` réussit localement.
- Les runs CI obsolètes sont annulés.
- `main` interdit les pushes directs, force-pushes et suppressions.
- Le check `verify` réussit sur le SHA de la pull request et sur le SHA final
  de `main`.
- Aucun chemin hors périmètre n’est indexé.
