/**
 * Auth feature schemas.
 * @module schemas/auth
 */

import { z } from "zod";
import { emailSchema, passwordSchema } from "./common.js";
import { userRoleEnum } from "./user.js";

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: emailSchema,
    password: passwordSchema,
    role: userRoleEnum.optional(),
});

/** @typedef {import("zod").z.infer<typeof loginSchema>} LoginInput */
/** @typedef {import("zod").z.infer<typeof registerSchema>} RegisterInput */