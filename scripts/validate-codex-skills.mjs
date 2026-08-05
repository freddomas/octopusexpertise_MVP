#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import process from "node:process";

const projectRequired = new Set([
  "ai-seo",
  "brainstorming",
  "content-strategy",
  "copywriting",
  "dispatching-parallel-agents",
  "gh-address-comments",
  "gh-fix-ci",
  "impeccable",
  "programmatic-seo",
  "receiving-code-review",
  "requesting-code-review",
  "schema",
  "seo-audit",
  "site-architecture",
  "subagent-driven-development",
  "systematic-debugging",
  "test-driven-development",
  "using-git-worktrees",
  "verification-before-completion",
  "writing-plans",
]);

const availableRequired = [
  "code-review",
  "codex-meme-skill",
  "design-taste-frontend",
  "frontend-design",
  "github",
];

const projectRoot = resolve(import.meta.dirname, "..");
const projectSkills = join(projectRoot, ".codex", "skills");
const defaultCodexRoot = process.env.CODEX_HOME || join(homedir(), ".codex");
const failures = [];
const expected = new Set([...projectRequired, ...availableRequired]);

function filesUnder(directory) {
  if (!existsSync(directory)) return [];
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesUnder(path));
    else files.push(path);
  }
  return files;
}

function resolveAvailable(name, codexRoot = defaultCodexRoot) {
  const globalSkills = join(codexRoot, "skills");
  const pluginCache = join(codexRoot, "plugins", "cache");
  const aliases =
    name === "design-taste-frontend" ? [name, "taste-skill"] : [name];
  for (const root of [projectSkills, globalSkills]) {
    for (const alias of aliases) {
      const directory = join(root, alias);
      if (existsSync(join(directory, "SKILL.md"))) return directory;
    }
  }
  for (const skillPath of filesUnder(pluginCache).filter((path) =>
    path.endsWith("/SKILL.md"),
  )) {
    const directory = dirname(skillPath);
    const declared = readFileSync(skillPath, "utf8").match(
      /^name:\s*["']?([^"'\n]+)["']?\s*$/m,
    )?.[1];
    if (
      aliases.includes(declared) ||
      aliases.includes(directory.split("/").at(-1))
    )
      return directory;
  }
  return null;
}

function availableExternalSkills(codexRoot = defaultCodexRoot) {
  return availableRequired.flatMap((name) => {
    const directory = resolveAvailable(name, codexRoot);
    return directory ? [{ name, directory }] : [];
  });
}

function validateSkill(name, directory) {
  const skillPath = join(directory, "SKILL.md");
  const content = readFileSync(skillPath, "utf8");
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) {
    failures.push(`${name}: missing YAML frontmatter`);
    return;
  }
  const declaredName = frontmatter[1].match(
    /^name:\s*["']?([^"'\n]+)["']?\s*$/m,
  )?.[1];
  const description = frontmatter[1].match(
    /^description:\s*["']?(.+?)["']?\s*$/m,
  )?.[1];
  if (declaredName !== name)
    failures.push(`${name}: frontmatter name is ${declaredName ?? "missing"}`);
  if (!description) failures.push(`${name}: missing frontmatter description`);
  if (frontmatter[1].length > 1024)
    failures.push(`${name}: frontmatter exceeds 1024 characters`);

  for (const path of filesUnder(directory).filter((file) =>
    file.endsWith(".md"),
  )) {
    const markdown = readFileSync(path, "utf8");
    for (const token of ["superpowers:", "TodoWrite", "AskUserQuestion"]) {
      if (markdown.includes(token))
        failures.push(
          `${name}: unsupported ${token} in ${relative(directory, path)}`,
        );
    }
    for (const match of markdown.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      const target = match[1].split("#", 1)[0];
      if (
        !target ||
        /^(?:https?:|mailto:|\/)/.test(target) ||
        target.includes("<")
      )
        continue;
      const resolved = resolve(dirname(path), target);
      if (!existsSync(resolved))
        failures.push(
          `${name}: broken link ${target} in ${relative(directory, path)}`,
        );
    }
  }
}

function main() {
  for (const name of projectRequired) {
    const directory = join(projectSkills, name);
    if (!existsSync(join(directory, "SKILL.md")))
      failures.push(`${name}: missing project-local installation`);
    else validateSkill(name, directory);
  }

  const available = availableExternalSkills();
  for (const { name, directory } of available) {
    validateSkill(name, directory);
  }

  const lock = JSON.parse(
    readFileSync(join(projectRoot, ".codex", "skills.lock.json"), "utf8"),
  );
  const locked = new Set([
    ...Object.values(lock.projectLocal).flat(),
    ...Object.values(lock.inheritedCodexNative).flat(),
  ]);
  for (const name of expected) {
    if (!locked.has(name)) failures.push(`${name}: missing lock entry`);
  }
  for (const name of locked) {
    if (!expected.has(name)) failures.push(`${name}: unexpected lock entry`);
  }

  if (failures.length) {
    console.error(failures.join("\n"));
    process.exitCode = 1;
    return;
  }

  console.log(
    `Validated ${projectRequired.size} project-local Codex skills; ${available.length} external skills available.`,
  );
}

if (resolve(process.argv[1] ?? "") === import.meta.filename) main();

export { availableExternalSkills };
