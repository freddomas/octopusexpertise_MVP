# Codex Skills Installation Plan

**Goal:** Install the 25 selected skills at their latest verified source versions and keep only Codex-compatible instructions active.

**Sources:** OpenAI curated skills, `obra/superpowers`, `coreyhaines31/marketingskills`, `pbakaus/impeccable`, the installed GitHub plugin, and existing local Codex adaptations when no authoritative upstream is recorded.

## Tasks

- [x] Fetch authoritative upstream versions into a temporary quarantine.
- [x] Validate the pre-install state and record missing project-local skills.
- [x] Install remote-backed skills under `.codex/skills/` without changing `exports/`.
- [x] Preserve already Codex-native global/plugin skills when no safer upstream update path exists.
- [x] Replace incompatible namespaces and legacy harness tool names.
- [x] Validate frontmatter, relative links, JavaScript syntax, selected-skill coverage, and Codex compatibility.
- [x] Refresh Graphify after repository changes.
