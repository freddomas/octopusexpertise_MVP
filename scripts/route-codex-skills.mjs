#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { basename, dirname, isAbsolute, join, resolve, sep } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const defaultCatalog = join(
  projectRoot,
  "config",
  "codex",
  "skill-router",
  "routes.json",
);

function normalize(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’`]/g, "'")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function parseArgs(argv) {
  const options = { json: false, task: "", catalog: defaultCatalog };
  const positional = [];
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--json") options.json = true;
    else if (argument === "--task") options.task = argv[++index] ?? "";
    else if (argument === "--task-base64") {
      options.task = Buffer.from(argv[++index] ?? "", "base64").toString(
        "utf8",
      );
    } else if (argument === "--catalog")
      options.catalog = resolve(argv[++index] ?? "");
    else if (argument === "--help" || argument === "-h") options.help = true;
    else positional.push(argument);
  }
  if (!options.task) options.task = positional.join(" ");
  return options;
}

function matches(text, rule = {}) {
  const any = (rule.any ?? []).map(normalize);
  const all = (rule.all ?? []).map(normalize);
  const none = (rule.none ?? []).map(normalize);
  const matchedAny = any.filter((term) => text.includes(term));
  const matchedAll = all.filter((term) => text.includes(term));
  if (none.some((term) => text.includes(term))) return null;
  if (any.length && !matchedAny.length) return null;
  if (matchedAll.length !== all.length) return null;
  return [...matchedAll, ...matchedAny];
}

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

function skillFiles(directory, depth = 0) {
  if (!existsSync(directory) || depth > 8) return [];
  const direct = join(directory, "SKILL.md");
  if (existsSync(direct)) return [direct];
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory())
      files.push(...skillFiles(join(directory, entry.name), depth + 1));
  }
  return files;
}

function declaredSkillName(path) {
  const frontmatter = readFileSync(path, "utf8").match(
    /^---\n([\s\S]*?)\n---\n/,
  );
  return (
    frontmatter?.[1].match(/^name:\s*["']?([^"'\n]+)["']?\s*$/m)?.[1] ??
    basename(dirname(path))
  );
}

function discoverSkills() {
  const codexRoot = process.env.CODEX_HOME || join(homedir(), ".codex");
  const roots = [
    join(projectRoot, ".codex", "skills"),
    join(codexRoot, "skills"),
    join(codexRoot, "plugins", "cache"),
  ];
  const index = new Map();
  for (const root of roots) {
    for (const path of skillFiles(root)) {
      const name = declaredSkillName(path);
      const folder = basename(dirname(path));
      for (const key of [name, folder])
        if (!index.has(key)) index.set(key, path);
      const parts = path.split(sep);
      const skillsIndex = parts.lastIndexOf("skills");
      if (path.includes(`${sep}plugins${sep}cache${sep}`) && skillsIndex >= 2) {
        const plugin = parts[skillsIndex - 2];
        for (const key of [`${plugin}:${name}`, `${plugin}:${folder}`]) {
          if (!index.has(key)) index.set(key, path);
        }
      }
    }
  }
  return index;
}

function resolveSelection(selection, skills) {
  if (selection.mode === "fragment") {
    const path = isAbsolute(selection.path)
      ? selection.path
      : resolve(projectRoot, selection.path);
    return { ...selection, path, available: existsSync(path) };
  }
  const shortName = selection.skill?.split(":").at(-1);
  const path = skills.get(selection.skill) ?? skills.get(shortName);
  return { ...selection, path: path ?? null, available: Boolean(path) };
}

function deduplicate(selections) {
  const fullSkills = new Set(
    selections
      .filter(({ mode }) => mode === "full")
      .map(({ skill }) => skill?.split(":").at(-1)),
  );
  const seen = new Set();
  return selections.filter((selection) => {
    if (selection.mode === "fragment" && fullSkills.has(selection.sourceSkill))
      return false;
    const key =
      selection.mode === "fragment"
        ? `fragment:${selection.sourceSkill}:${selection.fragment}`
        : `full:${selection.skill}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function explicitSelection(task) {
  return task.match(/(?:^|\s)\$([a-z0-9][a-z0-9:-]*)/i)?.[1] ?? null;
}

function routeTask(task, catalog, skills) {
  const text = normalize(task);
  const activeCapabilities = detectCapabilities(catalog, text);
  const explicit = explicitSelection(task);
  const overlays = rank(catalog.overlays ?? [], text, activeCapabilities);
  const primary = explicit
    ? {
        id: "explicit-skill",
        score: Number.MAX_SAFE_INTEGER,
        matched: [`$${explicit}`],
        select: [{ skill: explicit, mode: "full" }],
      }
    : (rank(catalog.routes ?? [], text, activeCapabilities)[0] ?? null);
  const selected = [
    ...(primary?.select ?? []),
    ...overlays.flatMap(({ select }) => select ?? []),
  ];
  const resolved = deduplicate(selected).map((selection) =>
    resolveSelection(selection, skills),
  );
  return {
    task,
    capabilities: [...activeCapabilities],
    confidence: !primary
      ? "low"
      : explicit || primary.score >= 100
        ? "high"
        : "medium",
    primary: primary
      ? { id: primary.id, score: primary.score, matched: primary.matched }
      : null,
    overlays: overlays.map(({ id, score, matched }) => ({
      id,
      score,
      matched,
    })),
    resolved,
    fallback: primary
      ? null
      : "Aucune route fiable: comparer les métadonnées des skills exposées et ne charger que la meilleure correspondance.",
  };
}

function printHuman(result) {
  if (!result.primary) {
    process.stdout.write(`${result.fallback}\n`);
    return;
  }
  process.stdout.write(`Route: ${result.primary.id} (${result.confidence})\n`);
  for (const item of result.resolved) {
    const name =
      item.mode === "fragment"
        ? `${item.sourceSkill}#${item.fragment}`
        : item.skill;
    process.stdout.write(
      `- ${item.mode}: ${name}${item.path ? ` -> ${item.path}` : " (indisponible)"}\n`,
    );
  }
}

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
