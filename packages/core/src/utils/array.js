/**
 * Array utilities (immutable by default).
 * @module utils/array
 */

/**
 * Group items by a key derived from each item.
 * @template T
 * @param {T[]} arr
 * @param {(item: T) => string | number} keyFn
 * @returns {Record<string, T[]>}
 */
export const groupBy = (arr, keyFn) => {
    const out = {};
    for (const item of arr ?? []) {
        const key = String(keyFn(item));
        (out[key] ??= []).push(item);
    }
    return out;
};

/**
 * Deduplicate items by a key derived from each item (first wins).
 * @template T
 * @param {T[]} arr
 * @param {(item: T) => unknown} keyFn
 * @returns {T[]}
 */
export const uniqueBy = (arr, keyFn) => {
    const seen = new Set();
    const out = [];
    for (const item of arr ?? []) {
        const key = keyFn(item);
        if (seen.has(key)) continue;
        seen.add(key);
        out.push(item);
    }
    return out;
};

/** Split an array into chunks of at most `size`. */
export const chunk = (arr, size = 10) => {
    const out = [];
    const n = Math.max(1, size);
    for (let i = 0; i < (arr?.length ?? 0); i += n) out.push(arr.slice(i, i + n));
    return out;
};

/** Immutable sort returning a new array (avoids mutating the source). */
export const toSorted = (arr, compareFn) => [...(arr ?? [])].toSorted(compareFn);

/** Sum a derived numeric value across items. */
export const sumBy = (arr, valueFn) =>
    (arr ?? []).reduce((acc, item) => acc + (Number(valueFn(item)) || 0), 0);