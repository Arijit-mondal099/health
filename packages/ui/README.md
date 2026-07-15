[← Back to root README](../../README.md)

<div align="center">

# @health/ui

### Shared **shadcn/ui** source package for the **Health** monorepo — React 19 components, hooks, and styles.

[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38BDF8.svg)](https://tailwindcss.com/)
[![Radix](https://img.shields.io/badge/Radix-UI-161618.svg)](https://www.radix-ui.com/)
[![No Build](https://img.shields.io/badge/build-none-2ea44f.svg)](https://bun.sh/)

</div>

---

## 📖 Overview

`@health/ui` is the **shared UI package** of the Health monorepo. It is a shadcn/ui **source** package (new-york style) consumed directly by `apps/web` and `apps/admin` — there is **no build step**; consumers read the unbuilt workspace source via Vite's `server.fs.allow`.

Part of the [`health`](../../README.md) monorepo.

## ✨ What's inside

- 🧩 **Components** — Button, Card, Input, Label, Badge, Avatar, Dialog, Drawer, Dropdown Menu, Tabs, Table, Select, Switch, Tooltip, Accordion, Alert Dialog, Carousel, Chart (Recharts), Skeleton, Separator, Textarea, Sonner (`Toaster`).
- 🪝 **Hooks** — shared React hooks (`#hooks/*`).
- 🎨 **Styling** — `globals.css` (Tailwind v4 + brand gradient), `lib/utils.js` (`cn` helper via `clsx` + `tailwind-merge`).
- 🌗 **Theming** — `next-themes` ready; `--primary` recolored green with a `brand-gradient` utility.

## 📦 Exports

```js
import { Button } from "@health/ui/components/button";
import { Toaster } from "@health/ui/components/sonner";
import { cn } from "@health/ui/lib/utils";
import "@health/ui/globals.css";
```

## 🧩 Consuming from an app

A consumer app (`web`/`admin`) needs all of:

1. `"@health/ui": "workspace:*"` in its `package.json`.
2. In `src/index.css`:
   ```css
   @import "@health/ui/globals.css";
   @source "../../../packages/ui/src/**/*.{js,jsx}";
   ```
3. In `vite.config.js`:
   ```js
   export default defineConfig({
     plugins: [react()],
     optimizeDeps: { exclude: ["@health/ui"] },
     server: { fs: { allow: [repoRoot] }, strictPort: true },
   });
   ```

## ➕ Adding components

```bash
bunx shadcn@latest add <name> -c packages/ui
```

The `-c packages/ui` flag is **required** (always add from the package, never repo root). Use `-o` to overwrite existing files.

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| UI primitives | Radix UI |
| Styling | Tailwind CSS v4, class-variance-authority, clsx, tailwind-merge |
| Icons | lucide-react |
| Charts | Recharts |
| Overlays | vaul (drawer), embla-carousel-react |
| Theme | next-themes, tw-animate-css |

## ⚙️ Development

No build step. Run an app that consumes it to see changes live.

```bash
bun install   # from repo root
```

## 📄 License

[MIT](../../LICENSE) © 2024 Arijit Mondal.
