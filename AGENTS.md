# AGENTS.md

Compact guidance for working in this repo. For behavioral rules, see `CLAUDE.md` (do not duplicate it here).

## Stack & package manager

- **bun** is the package manager (`bun.lock`). Use `bun install`, `bun run <script>`.
- npm workspaces monorepo: `apps/*`, `packages/*`. Node >= 22 (root `engines`).
- No TypeScript anywhere — plain JS/JSX (`tsx: false` in `packages/ui/components.json`).

## Workspace packages

- `apps/web` (`@health/web`) — patient-facing React 19 SPA. Vite, Tailwind v4, Redux Toolkit, Router v7. Dev **port 5173**.
- `apps/admin` (`@health/admin`) — doctor/admin console SPA. Same stack + recharts. Dev **port 5174**.
- `apps/api` (`@health/api`) — Express 5 + Mongoose + Cloudinary + Razorpay backend, port 4000, `nodemon` in dev. Must be running for either frontend to work (auth, doctor data, payments).
- `packages/ui` (`@health/ui`) — shared shadcn/ui source package consumed directly (no build step). **Shared by web and admin — never restyle or re-theme it from app-specific work.**
- `packages/core` (`@health/core`) — framework-agnostic shared code (frozen-constant enums, date/appointment helpers, errors, auth Zod schemas, `ApiResponse`). Plain JS + JSDoc, no build step. Its export map is intentionally tiny: `.`, `./errors`, `./response`, `./schemas/auth`, `./schemas/validate` — add subpaths deliberately, not speculatively.

## Commands

- Run one app from the root: `bun run dev:web` / `dev:admin` / `dev:api`. Builds: `bun run build:web` / `build:admin` (api needs no build). Don't switch these to `bun run --filter` — orphaned Vite child processes survive Ctrl+C.
- Lint: `bun run lint` → `oxlint . --deny-warnings` (warnings fail). Format: `bun run format`; check with `format:check`.
- Known pre-existing `format:check` failures: all `README*.md` and `packages/ui/src/components/chart.jsx`. When formatting your own changes, target files explicitly (`bunx oxfmt --write <files>`) instead of running repo-wide format.
- No test suite exists. Verify changes by building the affected app(s) and exercising them against `bun run dev:api`.

## Git / commits

- Husky `pre-commit` runs only `bun run lint`; `commit-msg` runs `commitlint` (`@commitlint/config-conventional`). Conventional Commits required; warnings block the commit. Do not commit unless asked.

## Shared `@health/core` conventions

- Pure logic only: no React, Express, or Mongoose imports.
- Enums are frozen arrays in `src/constants/` (`USER_ROLES`, `APPOINTMENT_STATUS`) reused by Zod schemas and both UIs — don't hardcode string unions elsewhere.
- Validate input with `parseWith(schema, data)` from `@health/core/schemas/validate` (throws `ValidationError`) or the Express `validateBody(schema)` middleware in `apps/api/src/middlewares/validate.middleware.js`.
- `ApiResponse` (in `src/response.js`) wire format: `status`, `success`, `message` (text) + `response` (payload). Both frontends read `data.message` / `data.response` — do NOT rename either field.

## Lint quirks (oxlint)

- `_id` is allowlisted for Mongo docs — don't rename fields to appease lint.
- Array sorting uses `[...arr].toSorted(...)` (ES2023), not `.sort()` — see `apps/admin/src/utils/appointmentCharts.js`. `.sort(...)` on a Mongoose query chain is fine.

## Shared `@health/ui` (shadcn) setup

- Add components with `bunx shadcn@latest add <name> -c packages/ui` — `-c packages/ui` is required. If a file already exists, `-y` does not auto-confirm; pass `-o` (overwrites all existing ui files).
- Aliases inside the package: `#components/*` and `#lib/*`. There is no `#hooks` mapping (that directory was removed).
- A consumer app needs all of:
    - `"@health/ui": "workspace:*"` (+ `"@health/core": "workspace:*"`) in `package.json`.
    - In `src/index.css`: `@import "@health/ui/globals.css";` and `@source "../../../packages/ui/src/**/*.{js,jsx}";`.
    - In `vite.config.js`: `optimizeDeps.exclude: ["@health/ui", "@health/core"]`, `server.fs.allow` set to the repo root (Vite reads unbuilt workspace source), `strictPort: true`.

## Theme & design system

- The brand theme lives ONLY in `packages/ui/src/globals.css` (terracotta primary + `--brand-from/via/to` gradient tokens); both apps import it. Recolor there, never per-app.
- Per-app fonts: Fraunces display (`--font-display` theme token), Figtree body, IBM Plex Mono data. The override MUST target `:root, .dark { --font-sans/--font-mono }` because globals.css re-declares those variables inside `.dark` — a `:root`-only override silently reverts fonts in dark mode.
- apps/web uses an "appointment slip" vocabulary via custom `@utility`s in its `index.css` (`file-label`, `stamp`, `dot-leader`, `edge-perforated`, `dot-grid`, `scrollbar-x`); admin keeps only `file-label`. Don't import utilities across apps — they're defined locally per app.
- Dark-mode gotcha: `--card` equals `--background` in dark, so raised paper surfaces must use `bg-popover`.
- Both apps serve the same `public/favicon.svg` (terracotta cross). `apps/web/src/assets/logo.png` is kept only because the root `README.md` embeds it.

## Frontend conventions

- Redux Toolkit: slices live in `src/features/<domain>/<domain>Slice.js`, store in `src/store`. Only apps/web keeps an explicit `"redux"` dependency (its `rootReducer.js` imports `combineReducers` directly); admin relies on RTK alone.
- Toasts: both apps use `sonner` (`import { toast } from "sonner"`; `<Toaster />` from `@health/ui` mounted in each `App.jsx`). No react-toastify anywhere.
- Razorpay checkout loads via `<script>` in `apps/web/index.html`, not npm.

## Runtime prerequisites

- Required env files (exist locally): `apps/api/.env` (PORT=4000, MONGODB_URI, JWT_SECRET/JWT_EXPIRY, CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET, RAZORPAY_KEY_ID/RAZORPAY_SECRET_KEY, CURRENCY); `apps/web/.env` and `apps/admin/.env` need `VITE_BACKEND_URL=http://localhost:4000` (web also `VITE_RAZORPAY_KEY_ID`).
- Browser errors like `GET http://localhost:4000/api/v1/... net::ERR_CONNECTION_REFUSED` mean the API isn't running — start `bun run dev:api`; not a code bug.
- Agent skills live in `.claude/skills/` (shadcn, frontend-design, ui-ux-pro-max, vercel-react-best-practices, webapp-testing) and load via the skill tool for UI work.