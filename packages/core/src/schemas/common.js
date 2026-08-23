/**
 * Shared Zod schemas used across features.
 * @module schemas/common
 */

import { z } from "zod";
import { EMAIL_RE } from "../constants/index.js";

/** Email address. */
export const emailSchema = z.string().min(1, "Email is required").regex(EMAIL_RE, "Invalid email");

/** Password (minimum length). */
export const passwordSchema = z.string().min(8, "Password must be at least 8 characters");