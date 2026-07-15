/**
 * `@health/core` — shared, framework-agnostic code for the monorepo.
 *
 * Public API. Prefer deep imports (e.g. `@health/core/schemas/auth`) in
 * hot paths for better tree-shaking.
 *
 * @module core
 */

export * from "./constants/index.js";
export * from "./errors/index.js";
export * from "./response.js";
export * from "./utils/index.js";
export * from "./schemas/index.js";