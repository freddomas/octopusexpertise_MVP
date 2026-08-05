# Octopus Expertise Public Website Implementation Plan

> **For agentic workers:** Use `subagent-driven-development` only when current instructions permit delegation and the tasks are independent. Otherwise execute inline. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish the bilingual public website from the supplied specification using the Superdesign Deep Red Style adapted to the logo's blue-violet palette.

**Architecture:** Keep Next.js App Router and add a locale-first public route layer backed by typed FR/EN content. Render the cinematic home page and shared public shell as client-aware React components, while static content pages reuse one verified page model. Use CSS transforms, observers, pointer tilt and reduced-motion fallbacks instead of a heavy 3D dependency.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, CSS, Playwright.

## Global Constraints

- Public website only; no authenticated B2B platform implementation.
- Visible brand spelling is always `Octopus Expertise`.
- French and English content must be complete; untranslated route slugs remain stable until their mapping is specified.
- `Confier un besoin` / `Submit a need` is the primary marketing action; login remains utility-only.
- No invented clients, testimonials, partners, projects, statistics, offices, team members, certifications or platform capabilities.
- Do not use a literal octopus, squid or tentacles as the visual concept.
- Deep Red Style structure is adapted from red-orange to midnight blue, electric blue and violet.
- Motion is intense but fluid, responsive and disabled or reduced under `prefers-reduced-motion`.
- Secure uploads and operational form submission are not claimed before their backing services are specified.

---

### Task 1: Design context and public route contract

**Files:**

- Create: `.superdesign/init/*.md`
- Create: `.superdesign/design-system.md`
- Create: `tests/public-site.spec.ts`
- Create: `playwright.config.ts`
- Modify: `package.json`

**Interfaces:**

- Consumes: supplied website spec, logo and Deep Red Style prompt.
- Produces: locale routes `/fr` and `/en`, shared public navigation labels, browser-level acceptance contract.

- [ ] **Step 1: Write the failing Playwright contract**

  Assert locale routing, exact positioning copy, primary CTA hierarchy, all three conversions, exact contacts, mobile navigation, translation switch, interactive orchestration and reduced-motion behavior.

- [ ] **Step 2: Run the focused test and observe RED**

  Run: `npm run test:e2e -- --grep "public website"`

  Expected: FAIL because the locale pages and Playwright script do not exist.

- [ ] **Step 3: Add only the test runner configuration required to execute RED**

  Add Playwright as a development dependency, root scripts and a local Next.js web server configuration.

### Task 2: Locale content and public shell

**Files:**

- Create: `apps/web/src/content/site-content.ts`
- Create: `apps/web/src/components/site-header.tsx`
- Create: `apps/web/src/components/site-footer.tsx`
- Create: `apps/web/src/app/[locale]/layout.tsx`
- Modify: `apps/web/src/app/layout.tsx`
- Modify: `apps/web/src/app/page.tsx`

**Interfaces:**

- Consumes: `Locale = "fr" | "en"` and `getSiteContent(locale)`.
- Produces: `SiteHeader`, `SiteFooter`, locale navigation, metadata and `/` → `/fr` redirect.

- [ ] **Step 1: Implement the smallest typed bilingual content model that satisfies navigation and positioning tests**
- [ ] **Step 2: Implement sticky responsive navigation, locale switch and public footer**
- [ ] **Step 3: Run Playwright and keep expected home-page assertions RED while shell assertions turn GREEN**

### Task 3: Cinematic interactive home page

**Files:**

- Create: `apps/web/src/components/public-home.tsx`
- Create: `apps/web/src/components/motion-layer.tsx`
- Create: `apps/web/public/octopus-expertise-logo.webp`
- Create: `apps/web/src/app/[locale]/page.tsx`
- Modify: `apps/web/src/app/globals.css`

**Interfaces:**

- Consumes: locale home content and route helpers.
- Produces: hero, proof rail, value pillars, interactive orchestration, capabilities, sectors, six-step method, partner network, territory, platform boundary, quality controls and final conversion.

- [ ] **Step 1: Implement the exact hero and conversion hierarchy**
- [ ] **Step 2: Add interactive orchestration tabs with keyboard semantics**
- [ ] **Step 3: Add pointer tilt, parallax, reveal, magnetic actions and reduced-motion fallbacks**
- [ ] **Step 4: Run focused Playwright until the home contract is GREEN**

### Task 4: Specified public content pages

**Files:**

- Create: `apps/web/src/components/content-page.tsx`
- Create: `apps/web/src/app/[locale]/[...slug]/page.tsx`

**Interfaces:**

- Consumes: locale page definitions keyed by stable public slug.
- Produces: Expertises, Secteurs, Méthode, Réseau partenaires, Confier un besoin, Plateforme, Qualité-conformité, À propos and Contact pages plus truthful specification-boundary states.

- [ ] **Step 1: Add route assertions for the specified pages and observe RED**
- [ ] **Step 2: Implement reusable editorial page sections and contact actions**
- [ ] **Step 3: Preserve explicit unavailable/unspecified boundaries for legal copy, uploads, platform demos and form processing**
- [ ] **Step 4: Run desktop and mobile Playwright flows until GREEN**

### Task 5: Verification and publication

**Files:**

- Modify: `graphify-out/*` only through `graphify update .` when available.

**Interfaces:**

- Consumes: final clean feature worktree.
- Produces: fresh verification evidence, explicit commit and remote feature branch.

- [ ] **Step 1: Run `npm run verify` once on the final worktree state**
- [ ] **Step 2: Review browser screenshots at desktop, tablet and mobile sizes**
- [ ] **Step 3: Run `git diff --check` and a targeted truth/privacy scan**
- [ ] **Step 4: Stage only explicit website paths and commit with the configured identity**
- [ ] **Step 5: Push `feat/public-website` and verify the remote ref matches HEAD**
