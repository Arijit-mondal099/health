/**
 * Number formatting and math utilities.
 * @module utils/number
 */

import { CURRENCY, LOCALE } from "../constants/index.js";

/** Format a numeric amount as currency using `Intl.NumberFormat`. */
export const formatCurrency = (amount, currency = CURRENCY, locale = LOCALE) =>
    new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
    }).format(Number(amount) || 0);

/** Clamp a number between `min` and `max`. */
export const clamp = (value, min, max) => Math.min(Math.max(Number(value) || 0, min), max);

/** Round a number to `decimals` decimal places. */
export const roundTo = (value, decimals = 2) => {
    const factor = 10 ** decimals;
    return Math.round((Number(value) || 0) * factor) / factor;
};

/** Coerce a value to a finite number, falling back when invalid. */
export const toNumber = (value, fallback = 0) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
};