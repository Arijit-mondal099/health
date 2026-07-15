/**
 * Framework-agnostic validation helper.
 * @module schemas/validate
 */

import { ValidationError } from "../errors/index.js";

/**
 * Parse `data` with a Zod schema, throwing a `ValidationError` on failure.
 * @template {import("zod").ZodTypeAny} T
 * @param {T} schema
 * @param {unknown} data
 * @returns {import("zod").z.infer<T>}
 */
export const parseWith = (schema, data) => {
    const result = schema.safeParse(data);
    if (!result.success) {
        throw new ValidationError("Validation failed", result.error.issues);
    }
    return result.data;
};