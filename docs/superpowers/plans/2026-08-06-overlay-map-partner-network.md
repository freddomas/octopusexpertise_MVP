# Hero Overlay, Map and Partner Network Implementation Plan

> **For agentic workers:** Use `subagent-driven-development` only when current instructions permit delegation and the tasks are independent. Otherwise execute inline. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the animated 3D cube overlay and refine the landing-page hierarchy, compact cards, regional map interactions, and partner-network illustration.

**Architecture:** Keep `PublicHome` as the existing client surface and add a focused `HeroCubeAnimation` client leaf backed by deterministic motion helpers. Preserve the current deep-blue-violet art direction while replacing the map SVG points with accessible positioned region spheres and the circular network graphic with a factual six-axis signal dashboard.

**Tech Stack:** Next.js 16.3, React 19, TypeScript strict, Three.js, CSS, Node Test, Playwright.

## Global Constraints

- Preserve the current French and English hero copy.
- Place the cube animation above the hero title without obscuring it.
- Remove the hero scroll indicator.
- Keep the map focused on the DRC with neighbouring countries and ocean subdued.
- Use only the supplied factual region and partner-axis names; invent no performance values.
- Support keyboard focus, hover labels, mobile layout, and reduced motion.
- Run `npm run verify` before publication.

---

### Task 1: Regression contracts

**Files:**

- Create: `apps/web/tests/hero-cube-motion.test.mjs`
- Modify: `tests/public-site.spec.ts`

**Interfaces:**

- Consumes: production DOM, computed layout, and pure motion exports.
- Produces: failing contracts for cube presence/readiness, vertical hero order, removed scroll cue, compact cards, balanced type, interactive region spheres, and the six-axis partner dashboard.

- [ ] **Step 1: Add pure motion tests** for six synchronized cubes, safe separation, opposite quarter-turns, camera radius, and unique atlas selections.
- [ ] **Step 2: Add Playwright assertions** requiring `[data-hero-cube-animation]`, `data-render-ready`, stage-before-title geometry, no `.scroll-cue`, compact pillar height, balanced type ratios, three large region buttons in correct normalized map zones, visible hover labels, and six partner signals.
- [ ] **Step 3: Run the targeted Node test** with `node --test apps/web/tests/hero-cube-motion.test.mjs` and expect `ERR_MODULE_NOT_FOUND`.
- [ ] **Step 4: Run the targeted Playwright tests** and expect failures for the missing cube stage, old scroll cue, old map points, and old network visual.

### Task 2: Three.js hero overlay

**Files:**

- Create: `apps/web/src/features/hero/hero-cube-motion.ts`
- Create: `apps/web/src/features/hero/HeroCubeAnimation.tsx`
- Add: `apps/web/public/images/professions-atlas.png`
- Modify: `apps/web/package.json`
- Modify: `package-lock.json`
- Modify: `apps/web/src/components/public-home.tsx`
- Modify: `apps/web/src/app/globals.css`

**Interfaces:**

- Produces: `sampleCubeStates`, `cameraPosition`, `globalAngularVelocity`, `detectTilesInRegions`, `uniqueRandomIndices`, and `<HeroCubeAnimation />` rendered as `.hero-cube-stage`.

- [ ] **Step 1: Install Three.js and its TypeScript declarations.**
- [ ] **Step 2: Add the deterministic motion helpers and verify the Node test passes.**
- [ ] **Step 3: Add the transparent, lazy-loading WebGL component with resize, visibility, reduced-motion, and disposal handling.**
- [ ] **Step 4: Compose the hero as animation then title, and remove the scroll cue markup and styles.**

### Task 3: Layout, map and partner illustration

**Files:**

- Modify: `apps/web/src/components/public-home.tsx`
- Modify: `apps/web/src/app/globals.css`
- Modify: `tests/public-site.spec.ts`

**Interfaces:**

- Produces: compact three-pillar layout, balanced hero/panel/tab type scale, region buttons with hover/focus tooltips, and `.partner-dashboard` with six factual signals.

- [ ] **Step 1: Reduce pillar minimum height and internal whitespace at desktop and mobile widths.**
- [ ] **Step 2: Reduce hero and orchestration display sizes while increasing left-tab legibility.**
- [ ] **Step 3: Replace SVG point markers with large region buttons positioned at Kinshasa, Lualaba, and Haut-Katanga and expose labels on hover/focus.**
- [ ] **Step 4: Replace the circular network graphic with a blue-violet six-signal dashboard inspired by the supplied reference, without invented metrics.**
- [ ] **Step 5: Run targeted Playwright tests until green.**

### Task 4: Visual and release verification

**Files:**

- Update: `graphify-out/*` via `graphify update .`.

**Interfaces:**

- Produces: desktop/mobile screenshots, full verification evidence, reviewed diff, and release-ready commit.

- [ ] **Step 1: Run the complete `npm run verify` gate once on the final worktree state.**
- [ ] **Step 2: Inspect desktop and mobile screenshots in one bounded visual pass; batch-fix all demonstrated issues and confirm once.**
- [ ] **Step 3: Run an independent whole-diff review and address actionable findings.**
- [ ] **Step 4: Run `graphify update .`, inspect the scoped diff, commit explicit paths, push, merge only after required checks, and verify production HTTP and Playwright.**
