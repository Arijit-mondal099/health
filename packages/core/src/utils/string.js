/**
 * String manipulation utilities.
 * @module utils/string
 */

/** Convert a string to a URL-safe slug. */
export const slugify = (value) =>
    String(value ?? "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

/** Capitalize the first character of a string. */
export const capitalize = (value) => {
    const str = String(value ?? "");
    return str ? str[0].toUpperCase() + str.slice(1) : str;
};

/** Title-case a string (capitalize each word). */
export const toTitleCase = (value) =>
    String(value ?? "")
        .toLowerCase()
        .split(/\s+/)
        .map(capitalize)
        .join(" ");

/** Truncate a string to `max` characters, appending an ellipsis when cut. */
export const truncate = (value, max = 80) => {
    const str = String(value ?? "");
    return str.length > max ? `${str.slice(0, Math.max(0, max - 1))}…` : str;
};

/** Normalize an email: lowercase and trimmed. */
export const normalizeEmail = (value) =>
    String(value ?? "")
        .toLowerCase()
        .trim();