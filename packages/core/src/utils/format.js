/**
 * Display formatting utilities.
 * @module utils/format
 */

/** Format a byte count into a human-readable string. */
export const formatBytes = (bytes, decimals = 2) => {
    const n = Number(bytes) || 0;
    if (n === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(n) / Math.log(k));
    return `${parseFloat((n / k ** i).toFixed(decimals))} ${sizes[i]}`;
};

/** Format a relative time quantity using `Intl.RelativeTimeFormat`. */
export const formatRelativeTime = (value, unit = "day", locale = "en-IN") =>
    new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(value, unit);

/** Format a number using `Intl.NumberFormat`. */
export const formatNumber = (value, locale = "en-IN") =>
    new Intl.NumberFormat(locale).format(Number(value) || 0);