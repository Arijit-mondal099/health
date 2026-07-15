import { MONTHS, getMonthKey, getStatusBreakdown } from "@health/core";

export const getMonthlyTrend = (appointments = []) => {
    const map = new Map();
    for (const a of appointments) {
        const parsed = getMonthKey(a?.slotDate);
        if (!parsed) continue;
        map.set(parsed.key, (map.get(parsed.key) || 0) + 1);
    }

    const entries = [...map.entries()]
        .toSorted(([a], [b]) => (a < b ? -1 : 1))
        .map(([key, count]) => ({
            month: MONTHS[Number(key.split("-")[1]) - 1],
            count,
        }));

    return entries.length > 6 ? entries.slice(-6) : entries;
};

export { getStatusBreakdown };