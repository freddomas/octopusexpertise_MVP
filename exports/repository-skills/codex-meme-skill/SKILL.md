---
name: codex-meme-skill
description: Recall, curate, and maintain durable project memory in private local Markdown files without a background service. Use when the user asks Codex to remember or recall project context across sessions, record a durable decision or lesson, prune stale memory, or summarize prior local work.
---

# Codex Meme Skill

Maintain explicit, auditable project memory under `.codex-local/memory/`. This path is local-only in this repository and must remain ignored by Git.

## Recall

1. Read the repository's canonical onboarding and routed documentation first; repository rules outrank memory.
2. Search `.codex-local/memory/` with `rg` for the user's topic. Do not load every memory file by default.
3. Distinguish current facts, historical observations, hypotheses, and stale entries.
4. Verify important claims against source files or current runtime state before relying on them.
5. Cite the memory file used and disclose any conflict with canonical documentation.

## Record

Record only information likely to remain useful across sessions: confirmed decisions and rationale, stable constraints, reproduced failure signatures, proven commands, important user preferences, and unresolved questions.

Use `.codex-local/memory/index.md` as a short topic index and one Markdown file per topic. Each entry must contain:

- date in ISO format;
- status: `verified`, `hypothesis`, `superseded`, or `open`;
- concise fact or decision;
- evidence path or command;
- replacement link when superseded.

Update an existing topic instead of appending duplicates. Mark stale information as superseded rather than silently deleting context that explains later decisions.

## Privacy and integrity

- Never record secrets, credentials, authentication material, raw CVs, contact details, salaries, or other sensitive personal data unless the user explicitly requests that exact local retention.
- Never copy memory into tracked files, commits, issues, or external services without explicit authorization.
- Never claim automatic capture or recall. This skill has no hooks, worker, database, network listener, or background process.
- Do not let memory override current user instructions, `AGENTS.md`, tests, source code, or verified runtime evidence.

This is a local Codex adaptation inspired by `thedotmack/claude-mem`; it intentionally omits that project's worker, telemetry-like capture, network service, and MCP dependencies.
