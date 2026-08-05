---
name: code-review
description: Review a local diff, commit range, branch, or pull request for high-confidence correctness, security, reliability, and repository-policy defects. Use when the user asks to review code or a PR, assess a patch before merge, or identify actionable defects without implementing fixes.
---

# Code Review

Produce a read-only, evidence-backed review. Do not edit code, post comments, approve, merge, or otherwise mutate external state unless the user explicitly requests that separate action.

## Workflow

1. Resolve the exact review target and base. Prefer explicit refs; otherwise use the current branch's merge base or the supplied diff.
2. Read the applicable `AGENTS.md` files and only the repository documentation routed to the changed paths.
3. Inspect the complete diff, then read enough surrounding code, tests, types, configuration, and call sites to validate behavior.
4. Trace changed inputs, state transitions, error paths, authorization boundaries, persistence, and externally visible outputs.
5. Run narrow, non-destructive checks only when they materially raise confidence. Never treat an unrun check as passing.
6. Report only defects introduced or exposed by the reviewed change. Separate pre-existing issues and unsupported suspicions from findings.

## Finding threshold

Include a finding only when all are true:

- It is actionable and attributable to the review target.
- A concrete input, state, or execution path demonstrates the failure or policy violation.
- The impact is material: wrong behavior, data loss, security exposure, broken compatibility, or a clear repository-rule violation.
- The evidence is strong enough to defend without relying on taste or speculation.

Do not report style preferences, generic hardening advice, missing tests without a demonstrated risk, linter-only issues, or hypothetical edge cases with no reachable path.

## Output

Lead with findings ordered by severity. For each finding provide:

- severity and concise title;
- exact file and line;
- triggering scenario;
- observed or inevitable impact;
- evidence and the smallest useful remediation direction.

Then list open questions or residual risks. If no qualifying issue exists, state that no high-confidence defect was found and name the evidence reviewed and checks actually run.

This workflow is a Codex-portable adaptation of Anthropic's public `code-review` plugin, with model-specific delegation and automatic GitHub commenting removed.
