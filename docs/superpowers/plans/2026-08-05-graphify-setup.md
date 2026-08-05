# Graphify Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Install and configure Graphify for Codex with Git-triggered graph refreshes and bounded semantic multi-agent support.

**Architecture:** Reuse the isolated official `graphifyy` installation, add only the Codex project integration, build an initial local AST graph, and install Graphify's post-commit and post-checkout hooks. Enable Codex's stable `multi_agent` feature globally without adding Gemini or a persistent watcher.

**Tech Stack:** Graphify 0.9.32, Codex CLI, Git hooks, TOML

## Global Constraints

- Do not install a permanent watcher.
- Do not configure Gemini for this project.
- Set `multi_agent = true` under Codex `[features]`.
- Multi-agent usage remains limited to precise, independent, bounded tasks.
- Preserve all pre-existing user changes.

---

### Task 1: Codex project integration

**Files:**

- Modify: `AGENTS.md`
- Create: `.codex/skills/graphify/SKILL.md`
- Create: `.codex/skills/graphify/references/*`
- Modify: `.codex/hooks.json`

**Interfaces:**

- Consumes: official `graphifyy` CLI already installed through pipx
- Produces: project-scoped Graphify instructions and Codex hooks

- [x] **Step 1: Install the Graphify Codex integration**

Run: `graphify install --project --platform codex`
Expected: Graphify reports project-scoped Codex files installed.

- [x] **Step 2: Verify no Gemini or watcher configuration was generated**

Run: `rg -n -i "gemini|graphify watch" AGENTS.md .codex`
Expected: no active Gemini or persistent watcher configuration.

### Task 2: Initial graph and Git refresh hooks

**Files:**

- Create: `graphify-out/*`
- Modify: `.git/hooks/post-commit`
- Modify: `.git/hooks/post-checkout`
- Modify: `.git/config`
- Modify: `.gitattributes`

**Interfaces:**

- Consumes: Graphify project integration
- Produces: initial AST graph and automatic commit/checkout refreshes

- [x] **Step 1: Build the initial graph without an LLM**

Run: `graphify extract . --code-only --force --timing`
Expected: `graphify-out/graph.json` is generated without API use.

- [x] **Step 2: Install Git hooks**

Run: `graphify hook install`
Expected: post-commit, post-checkout, and merge-driver setup are installed.

- [x] **Step 3: Verify hook status**

Run: `graphify hook status`
Expected: both hooks and the merge driver report installed.

### Task 3: Bounded Codex multi-agent support

**Files:**

- Modify: `/root/.codex/config.toml`
- Modify: `AGENTS.md`

**Interfaces:**

- Consumes: stable Codex `multi_agent` feature
- Produces: semantic-document extraction capability through bounded agent dispatch

- [x] **Step 1: Enable the stable feature**

Run: `codex features enable multi_agent`
Expected: `[features]` contains `multi_agent = true`.

- [x] **Step 2: Verify the effective setting**

Run: `codex features list`
Expected: `multi_agent` reports `true`.

- [x] **Step 3: Persist the project usage boundary**

Add an `AGENTS.md` rule limiting multi-agent use to independent, precise,
punctual, bounded work, including semantic document indexing.
Expected: future Codex sessions load the boundary automatically in this project.

### Task 4: Final scope verification

**Files:**

- Inspect: repository status and generated Graphify configuration

**Interfaces:**

- Consumes: Tasks 1 through 3
- Produces: evidence that requested setup is active and exclusions remain absent

- [x] **Step 1: Verify Graphify package provenance and SQL support**

Run: `python -m pip show graphifyy` inside Graphify's pipx environment and import `tree_sitter_sql`.
Expected: package is `graphifyy`, homepage is `Graphify-Labs/graphify`, and SQL support imports.

- [x] **Step 2: Verify no watcher process or Gemini project files exist**

Run: inspect process list and project files for active Graphify watcher/Gemini setup.
Expected: neither is present.

- [x] **Step 3: Review the exact repository diff**

Run: `git status --short` and `git diff --check`
Expected: only pre-existing user changes and Graphify setup artifacts are present; no whitespace errors.
