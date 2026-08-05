# OCTOPUS Expertise Project Bootstrap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an executable empty monorepo with Next.js, NestJS, and PostgreSQL while preserving every supplied artifact.

**Architecture:** npm workspaces coordinate two independent applications under `apps/`. The NestJS API receives a PostgreSQL connection pool through dependency injection and exposes a health endpoint; Docker Compose supplies the local database. The Next.js application remains a minimal App Router shell with no product behavior.

**Tech Stack:** Node.js 22, npm 10, Next.js 16.3, React 19, NestJS 11.1, TypeScript 5, PostgreSQL 17, Jest, ESLint, Docker Compose.

## Global Constraints

- Preserve all pre-existing images, specifications, and `exports/` content.
- Push directly to `main` at `https://github.com/freddomas/octopusexpertise_MVP.git`.
- Use `fredericmasiala@gmail.com` as the Git commit email.
- Do not add an ORM or domain model to this empty foundation.
- Keep secrets out of Git and document local values in `.env.example`.

---

### Task 1: Repository foundation

**Files:**

- Create: `agents.md`
- Create: `.gitignore`
- Create: `.nvmrc`
- Create: `.env.example`
- Create: `package.json`
- Create: `compose.yaml`
- Create: `README.md`

**Interfaces:**

- Consumes: Node.js 22, npm, Docker Compose.
- Produces: root commands `dev`, `build`, `lint`, `test`, `format:check`, `db:up`, and `db:down`; database URL `postgresql://octopus:octopus@localhost:5433/octopus_expertise`.

- [x] **Step 1: Create the repository configuration**

Create an npm-private workspace containing `apps/*`, pin Node 22 in `.nvmrc`, ignore generated files and local environment files, and define a PostgreSQL 17 Compose service with a health check and named volume.

- [x] **Step 2: Validate static configuration**

Run: `docker compose config --quiet`

Expected: exit code 0 with no output.

### Task 2: NestJS API and database health

**Files:**

- Create: `apps/api/package.json`
- Create: `apps/api/tsconfig.json`
- Create: `apps/api/tsconfig.build.json`
- Create: `apps/api/eslint.config.mjs`
- Create: `apps/api/src/main.ts`
- Create: `apps/api/src/app.module.ts`
- Create: `apps/api/src/database/database.constants.ts`
- Create: `apps/api/src/database/database.module.ts`
- Create: `apps/api/src/health/health.controller.ts`
- Create: `apps/api/src/health/health.service.spec.ts`
- Create: `apps/api/src/health/health.service.ts`

**Interfaces:**

- Consumes: `DATABASE_URL` from the environment and `pg.Pool` through token `DATABASE_POOL`.
- Produces: `HealthService.check(): Promise<{ status: 'ok'; database: 'up' }>` and `GET /api/health`.

- [x] **Step 1: Write the failing health test**

The test supplies `{ query: jest.fn().mockResolvedValue({ rows: [{ ok: 1 }] }) }` as the pool, calls `HealthService.check()`, and expects `{ status: 'ok', database: 'up' }` plus SQL `SELECT 1 AS ok`.

- [x] **Step 2: Run the test and verify RED**

Run: `npm test --workspace @octopus/api -- health.service.spec.ts --runInBand`

Expected: FAIL because `health.service.ts` does not exist.

- [x] **Step 3: Implement the minimal health service**

Inject `DATABASE_POOL`, execute `SELECT 1 AS ok`, and return the exact status object. Register the pool provider, service, and controller in focused NestJS modules.

- [x] **Step 4: Run the test and verify GREEN**

Run: `npm test --workspace @octopus/api -- health.service.spec.ts --runInBand`

Expected: one passing test suite and zero failures.

### Task 3: Next.js shell

**Files:**

- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/next.config.ts`
- Create: `apps/web/eslint.config.mjs`
- Create: `apps/web/src/app/layout.tsx`
- Create: `apps/web/src/app/page.tsx`
- Create: `apps/web/src/app/globals.css`

**Interfaces:**

- Consumes: Next.js App Router runtime.
- Produces: a minimal accessible page identifying the empty OCTOPUS Expertise foundation.

- [x] **Step 1: Create the generated/configuration shell**

Add strict TypeScript and ESLint configuration, root metadata, a semantic `main` region, and neutral local CSS without remote font or image dependencies.

- [x] **Step 2: Verify the production build**

Run: `npm run build --workspace @octopus/web`

Expected: exit code 0 and a statically generated `/` route.

### Task 4: Integrated verification and publication

**Files:**

- Create: `package-lock.json`
- Modify: `README.md`

**Interfaces:**

- Consumes: all root scripts, Docker daemon, Git remote.
- Produces: a reproducible local setup and synchronized `main` branch.

- [x] **Step 1: Install exact dependencies**

Run: `npm install`

Expected: exit code 0 and a root lockfile with zero high or critical audit findings.

- [x] **Step 2: Run repository verification**

Run: `npm run lint && npm test && npm run build && npm run format:check && docker compose config --quiet`

Expected: every command exits 0.

- [x] **Step 3: Verify live PostgreSQL integration**

Run PostgreSQL with `npm run db:up`, start the API, request `http://localhost:3001/api/health`, and confirm the exact response `{"status":"ok","database":"up"}` before stopping processes and Compose.

- [x] **Step 4: Commit and publish**

Stage only the explicit project files plus preserved supplied artifacts, commit with `chore: bootstrap Next Nest PostgreSQL monorepo`, push `main`, and verify local `HEAD`, `origin/main`, and `git ls-remote` all report the same SHA.
