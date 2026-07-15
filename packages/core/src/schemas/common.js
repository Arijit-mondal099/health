/**
 * Shared Zod schemas used across features.
 * @module schemas/common
 */

import { z } from "zod";
import {
    EMAIL_RE,
    OBJECT_ID_RE,
    SLOT_DATE_RE,
    DEFAULT_PAGE_SIZE,
    MAX_PAGE_SIZE,
} from "../constants/index.js";

/** MongoDB ObjectId string. */
export const objectIdSchema = z.string().regex(OBJECT_ID_RE, "Invalid ID");

/** Email address. */
export const emailSchema = z.string().min(1, "Email is required").regex(EMAIL_RE, "Invalid email");

/** Password (minimum length). */
export const passwordSchema = z.string().min(8, "Password must be at least 8 characters");

/** Pagination query (page/limit with sane defaults and coercion). */
export const paginationSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
});

/** Route `:id` param validated as an ObjectId. */
export const idParamSchema = z.object({
    id: objectIdSchema,
});

/** `DD-MM-YYYY` slot date string. */
export const slotDateSchema = z.string().regex(SLOT_DATE_RE, "Date must be DD-MM-YYYY");