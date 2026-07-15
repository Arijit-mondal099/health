/**
 * Object utilities.
 * @module utils/object
 */

/** Return a shallow copy of `obj` without the given keys. */
export const omit = (obj, keys = []) => {
    const out = { ...obj };
    for (const key of keys) delete out[key];
    return out;
};

/** Return a shallow copy of `obj` keeping only the given keys. */
export const pick = (obj, keys = []) => {
    const out = {};
    for (const key of keys) if (obj && key in obj) out[key] = obj[key];
    return out;
};

/** Deeply merge plain objects (later sources win; arrays are replaced). */
export const deepMerge = (...sources) => {
    const out = {};
    for (const src of sources) {
        if (!src || typeof src !== "object" || Array.isArray(src)) continue;
        for (const [key, value] of Object.entries(src)) {
            const existing = out[key];
            if (
                value &&
                typeof value === "object" &&
                !Array.isArray(value) &&
                existing &&
                typeof existing === "object" &&
                !Array.isArray(existing)
            ) {
                out[key] = deepMerge(existing, value);
            } else {
                out[key] = value;
            }
        }
    }
    return out;
};

/** True when a plain object has no own enumerable keys. */
export const isEmpty = (obj) => !obj || typeof obj !== "object" || Object.keys(obj).length === 0;