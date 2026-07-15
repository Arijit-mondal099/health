# AGENTS.md

Compact guidance for working in this repo. For behavioral rules, see `CLAUDE.md` (do not duplicate it here).

## Stack & package manager

- **bun** is the package manager (`bun.lock`). Use `bun install`, `bun run <script>`. `README.md` is stale: it says `npm` and references `backend/`,`frontend/`,`admin/` dirs that don't exist — the real layout is `apps/api`,`apps/web`,`apps/admin` (trust `package.json`/this file).
- npm workspaces monorepo: `apps/*`, `packages/*`. Node >= 22 (root `engines`).
- No TypeScript anywhere — plain JS/JSX (`tsx: false` in `packages/ui/components.json`).

## Workspace packages

- `apps/web` (`@health/web`) — React 19 SPA, Vite, Tailwind v4, Redux Toolkit, Router v7. Dev **port 5173**.
- `apps/admin` (`@health/admin`) — parallel React 19 SPA (doctor/admin dashboard). Dev **port 5174**. Still uses `react-toastify`.
- `apps/api` (`@health/api`) — Express 5 + Mongoose + Cloudinary + Razorpay backend. `nodemon` in dev. This must be running for the frontends to work (auth, doctor data, payments).
- `packages/ui` (`@health/ui`) — shared **shadcn/ui** source package, consumed directly (no build step).
- `packages/core` (`@health/core`) — framework-agnostic shared code (constants, errors, utils, Zod schemas, `ApiResponse`). Plain JS + JSDoc, **no build step**, consumed like `@health/ui` via its `exports` map (e.g. `@health/core`, `@health/core/schemas/auth`). Single source for enums, validation, and reusable helpers.

## Commands

- Run one app: `bun run dev:web` / `dev:admin` / `dev:api`. These use `bun --cwd apps/<x> vite` deliberately — do **not** switch to `bun run --filter`, which leaves orphaned Vite child processes on Ctrl+C.
- Build an app: `bun --cwd apps/web build` (or `bun run dev:web` then stop).
- **Lint:** `bun run lint` → `oxlint . --deny-warnings` (warnings are errors). **Format:** `bun run format` → `oxfmt . --write`. There is **no eslint/prettier**.
- No test suite exists. Verify changes by building and by running the dev server.

## Git / commits

- Husky `pre-commit` runs `bun run lint` and `commit-msg` runs `commitlint` (`@commitlint/config-conventional`). Commits must be **Conventional Commits** and must pass lint (warnings block the commit). Do not commit unless asked.

## Shared `@health/core` conventions

- Pure logic only: **no React, Express, or Mongoose imports**. Don't add framework-specific code here.
- Zod schemas live in `src/schemas/<feature>.js`. Validate a request with `parseWith(schema, data)` (throws `ValidationError`) or the Express `validateBody(schema)` middleware in `apps/api/src/middlewares/validate.middleware.js`.
- Enums are frozen arrays in `constants/` (e.g. `USER_ROLES`, `APPOINTMENT_STATUS`, `GENDERS`); Zod enums reuse them and the UI imports them — **don't hardcode string unions** elsewhere.
- `ApiResponse` (in `response.js`) wire format: `status`, `success`, `message` (text — frontends read `data.message`), and `response` (the payload — frontends read `data.response`, e.g. `userSlice.js:26`). The old `apps/api` copy misspelled the text field `massage` and named the payload `data`; both frontends expect `message` + `response`, so **do not rename either field**.

## Lint quirks (oxlint)

- `bun run lint` = `oxlint . --deny-warnings`: **warnings fail the build** (and the husky pre-commit).
- `_id` triggers `no-underscore-dangle` — this is expected for Mongo documents; don't "fix" it by renaming fields.
- `Array#sort()` triggers `no-array-sort` — use the provided `toSorted` util or `[...arr].toSorted(...)`.

## Shared `@health/ui` (shadcn) conventions

Adding a component: `bunx shadcn@latest add <name> -c packages/ui` — the `-c packages/ui` flag is required (never add from repo root). Uses new-york style, lucide icons, aliases `#components` / `#lib/utils` / `#hooks`.
A consumer app (web/admin) needs all of:

- `"@health/ui": "workspace:*"` in its `package.json`.
- In `src/index.css`: `@import "@health/ui/globals.css";` and `@source "../../../packages/ui/src/**/*.{js,jsx}";`.
- In `vite.config.js`: `optimizeDeps.exclude: ["@health/ui"]` and `server.fs.allow` set to repo root (so Vite can read the unbuilt workspace source), plus `strictPort: true`.
  Quirk: if a component file already exists, `shadcn add` prompts to overwrite and `-y` does **not** auto-confirm — pass `-o`/`--overwrite` to proceed (note: this overwrites all existing ui files).
  Theme: `--primary` and the brand gradient are recolored green; a `brand-gradient` utility class is available.

## Frontend conventions

- Redux Toolkit: slices live in `src/features/<domain>/<domain>Slice.js`, store in `src/store`. `redux` must stay an explicit dependency — `store/rootReducer.js` imports `combineReducers` from `"redux"` directly.
- Toasts differ by app: **web uses `sonner`** (`import { toast } from "sonner"`, `<Toaster />` from `@health/ui` mounted in `App.jsx`); **admin still uses `react-toastify`**. Don't mix them.
- Pre-installed agent skills live in `.agents/skills/` (e.g. `shadcn`, `frontend-design`, `ui-ux-pro-max`, `vercel-react-best-practices`, `webapp-testing`) and can be loaded via the skill tool for UI work.

## Runtime prerequisites

- `apps/api/.env` is required (PORT=4000, MONGODB_URI, JWT_SECRET/EXPIRY, CLOUDINARY__, RAZORPAY__, CURRENCY). `apps/web/.env` and `apps/admin/.env` need `VITE_BACKEND_URL=http://localhost:4000` (+ `VITE_RAZORPAY_KEY_ID` for web). These `.env` files exist locally.
- **The API must be running for the frontends to work.** Browser console errors like `GET http://localhost:4000/api/v1/... net::ERR_CONNECTION_REFUSED` mean the API isn't started — run `bun run dev:api` (not a code bug). Keep `dev:api` running alongside `dev:web`/`dev:admin`.
- Razorpay checkout script is loaded via `index.html`, not npm.