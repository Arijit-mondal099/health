/**
 * Safe parsing utilities.
 * @module utils/parse
 */

/** Parse JSON without throwing; returns `fallback` on failure. */
export const safeJsonParse = (value, fallback = null) => {
    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
};

/** Parse an integer, returning `fallback` when not finite. */
export const parseInteger = (value, fallback = 0) => {
    const n = parseInt(value, 10);
    return Number.isFinite(n) ? n : fallback;
};

/** Parse a boolean from loose inputs ("true"/"1"/true). */
export const parseBoolean = (value) =>
    value === true || value === "true" || value === "1" || value === 1;