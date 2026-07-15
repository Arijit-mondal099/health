[← Back to root README](../../README.md)

<div align="center">

# @health/core

### Framework-agnostic shared code for the **Health** monorepo — constants, errors, utils, and Zod schemas.

[![JavaScript](https://img.shields.io/badge/language-JavaScript-F7DF1E.svg)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Zod](https://img.shields.io/badge/Validation-Zod-3068B7.svg)](https://zod.dev/)
[![No Build](https://img.shields.io/badge/build-none-2ea44f.svg)](https://bun.sh/)

</div>

---

## 📖 Overview

`@health/core` is the **shared, framework-agnostic package** of the Health monorepo. It holds the single source of truth for enums/constants, reusable error classes, utility helpers, and **Zod validation schemas** used by both the API and the frontends. It contains **no React, Express, or Mongoose imports** — pure logic only, consumed directly via its `exports` map (no build step).

Part of the [`health`](../../README.md) monorepo.

## ✨ What's inside

- 🧩 **Constants** — frozen enums (`USER_ROLES`, `APPOINTMENT_STATUS`, `GENDERS`, HTTP codes, regex, app config).
- ❌ **Errors** — typed error classes (`AppError`, `ValidationError`, `AuthenticationError`, `AuthorizationError`, `NotFoundError`, `ConflictError`, `InternalError`).
- 🛠 **Utils** — string, number, date, format, parse, object, array, and appointment helpers.
- 🧪 **Schemas** — Zod schemas under `src/schemas` (`auth`, `user`, `doctor`, `appointment`, `common`) with a `validateBody`/`parseWith` helper.
- 📦 **ApiResponse** — the shared wire format (`status`, `success`, `message`, `response`).
- 🏷 **Types** — shared JSDoc type definitions.

## 📦 Exports

```js
import { ApiResponse } from "@health/core";
import { USER_ROLES } from "@health/core/constants";
import { ValidationError } from "@health/core/errors";
import { parseWith } from "@health/core/schemas/validate";
import { registerSchema } from "@health/core/schemas/auth";
import { toSorted } from "@health/core/utils";
```

| Subpath | Contents |
| :--- | :--- |
| `@health/core` | `ApiResponse` + root barrel |
| `@health/core/constants` | Enums & constants |
| `@health/core/errors` | Error classes |
| `@health/core/response` | `ApiResponse` |
| `@health/core/utils` | Utility helpers |
| `@health/core/schemas` | Zod schema barrel |
| `@health/core/schemas/validate` | `parseWith` / `validateBody` helper |
| `@health/core/schemas/<feature>` | Per-feature Zod schemas |
| `@health/core/types` | Shared types |

## 🧪 Usage

Validate a request in the API:

```js
import { validateBody } from "../middlewares/validate.middleware.js";
import { registerSchema } from "@health/core/schemas/auth";

router.post("/register", validateBody(registerSchema), registerUser);
```

The frontend imports the same constants to avoid hardcoded string unions:

```js
import { USER_ROLES, APPOINTMENT_STATUS } from "@health/core/constants";
```

## ⚙️ Development

No build step. Consumed directly via the workspace `exports` map.

```bash
bun install   # from repo root
```

## 📄 License

[MIT](../../LICENSE) © 2024 Arijit Mondal.
