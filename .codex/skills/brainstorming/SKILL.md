---
name: brainstorming
description: Use before creative implementation when intent, requirements, design choices, or success criteria may materially affect the result.
---

# Brainstorming Ideas Into Designs

Turn a request into the smallest sufficient design, then continue into planning
or implementation without routine approval gates.

## Codex Autonomy Contract

Treat the user's operational confidence threshold as binding. When the objective,
deliverable, scope, and critical constraints make execution reliable, proceed
without confirmation. Ask only when a material product, scope, risk, safety, or
authorization decision cannot be resolved from current context.

Repository and system instructions override any workflow checkpoint in this
skill. A design review is never an authorization gate by itself.

## Checklist

Track only the steps needed for the task:

1. **Explore project context** — check files, docs, recent commits
2. **Resolve material ambiguity** — ask the smallest blocking question only when needed
3. **Compare consequential approaches** — recommend the strongest option
4. **Define the design** — architecture, interfaces, edge cases, and validation
5. **Self-review** — fix placeholders, contradictions, ambiguity, and scope drift
6. **Continue** — write a plan when useful or implement directly when requested

## The Process

**Understanding the idea:**

- Check out the current project state first (files, docs, recent commits)
- Before asking detailed questions, assess scope: if the request describes multiple independent subsystems (e.g., "build a platform with chat, file storage, billing, and analytics"), flag this immediately. Don't spend questions refining details of a project that needs to be decomposed first.
- If the project is too large for a single spec, help the user decompose into sub-projects: what are the independent pieces, how do they relate, what order should they be built? Then brainstorm the first sub-project through the normal design flow. Each sub-project gets its own spec → plan → implementation cycle.
- For appropriately-scoped projects, resolve non-material details from project conventions
- Ask one concise question only when the answer can materially change the result
- Focus on understanding: purpose, constraints, success criteria

**Exploring approaches:**

- Compare alternatives only when the choice is consequential
- Present options conversationally with your recommendation and reasoning
- Lead with your recommended option and explain why
- YAGNI ruthlessly - remove unnecessary features from every approach and design

**Presenting the design:**

- Once you believe you understand what you're building, present the design
- Scale each section to its complexity: a few sentences if straightforward, up to 200-300 words if nuanced
- Present the design compactly; do not add per-section approval gates
- Cover: architecture, components, data flow, error handling, testing
- Be ready to go back and clarify if something doesn't make sense

**Design for isolation and clarity:**

- Break the system into smaller units that each have one clear purpose, communicate through well-defined interfaces, and can be understood and tested independently
- For each unit, you should be able to answer: what does it do, how do you use it, and what does it depend on?
- Can someone understand what a unit does without reading its internals? Can you change the internals without breaking consumers? If not, the boundaries need work.
- Smaller, well-bounded units are also easier for you to work with - you reason better about code you can hold in context at once, and your edits are more reliable when files are focused. When a file grows large, that's often a signal that it's doing too much.

**Working in existing codebases:**

- Explore the current structure before proposing changes. Follow existing patterns.
- Where existing code has problems that affect the work (e.g., a file that's grown too large, unclear boundaries, tangled responsibilities), include targeted improvements as part of the design - the way a good developer improves code they're working in.
- Don't propose unrelated refactoring. Stay focused on what serves the current goal.

## After the Design

**Documentation:**

- When durable documentation is useful, write the validated design to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`
  - (User preferences for spec location override this default)
- Use elements-of-style:writing-clearly-and-concisely skill if available
- Commit only when the user or active repository workflow authorizes it

**Spec Self-Review:**
After writing the spec document, look at it with fresh eyes:

1. **Placeholder scan:** Any "TBD", "TODO", incomplete sections, or vague requirements? Fix them.
2. **Internal consistency:** Do any sections contradict each other? Does the architecture match the feature descriptions?
3. **Scope check:** Is this focused enough for a single implementation plan, or does it need decomposition?
4. **Ambiguity check:** Could any requirement be interpreted two different ways? If so, pick one and make it explicit.

Fix any issues inline. No need to re-review — just fix and move on.

**Implementation:**

- If the user requested only a design, deliver it and stop.
- If implementation was requested, continue without a routine checkpoint.
- Use writing-plans for multi-step work; implement small, sufficiently determined changes directly.

## Visual Companion

A browser-based companion can show mockups, diagrams, and visual comparisons.
Use it when visual treatment materially improves understanding and the available
tool is already authorized. Do not pause solely to offer a companion.

- **Use the browser** for content that IS visual — mockups, wireframes, layout comparisons, architecture diagrams, side-by-side visual designs
- **Use the terminal** for content that is text — requirements questions, conceptual choices, tradeoff lists, A/B/C/D text options, scope decisions

A question about a UI topic is not automatically a visual question. "What does personality mean in this context?" is a conceptual question — use the terminal. "Which wizard layout works better?" is a visual question — use the browser.

When using it, read [visual-companion.md](visual-companion.md) first.
