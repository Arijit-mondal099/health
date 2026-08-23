/**
 * Date utilities. Slot dates are stored as `DD-MM-YYYY` strings.
 * @module utils/date
 */

/** Short month names indexed 0-11. */
export const MONTHS = Object.freeze([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
]);

/** Format a `DD-MM-YYYY` slot date as `DD Mon YYYY`. */
export const formatSlotDate = (slotDate) => {
    const parts = String(slotDate ?? "").split("-");
    if (parts.length < 3) return slotDate ?? "";
    const day = parts[0];
    const monthIdx = Number(parts[1]) - 1;
    const year = parts[2];
    const month = MONTHS[monthIdx] ?? parts[1];
    return `${day} ${month} ${year}`;
};

/** Parse a `DD-MM-YYYY` slot date into its parts, or `null` if malformed. */
export const parseSlotDate = (slotDate) => {
    const parts = String(slotDate ?? "").split("-");
    if (parts.length < 3) return null;
    const day = Number(parts[0]);
    const month = Number(parts[1]);
    const year = Number(parts[2]);
    if (!day || !month || !year) return null;
    return { day, month, year };
};

/** Return a stable `YYYY-M` sort key for a `DD-MM-YYYY` slot date, or `null`. */
export const getMonthKey = (slotDate) => {
    const parsed = parseSlotDate(slotDate);
    if (!parsed) return null;
    return { key: `${parsed.year}-${parsed.month}`, month: MONTHS[parsed.month - 1] };
};

/** Compute age in whole years from a date-of-birth string. */
export const toAge = (dob) => {
    const birth = new Date(dob);
    if (Number.isNaN(birth.getTime())) return 0;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age -= 1;
    return age;
};