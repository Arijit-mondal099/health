/**
 * Shared regular expressions.
 * @module constants/regex
 */

/** Email address. */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** MongoDB 24-character hex ObjectId. */
export const OBJECT_ID_RE = /^[a-f\d]{24}$/i;

/** Appointment slot date in `DD-MM-YYYY` format. */
export const SLOT_DATE_RE = /^\d{2}-\d{2}-\d{4}$/;