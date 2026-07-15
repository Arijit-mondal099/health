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

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordSchema,
});

export const forgotPasswordSchema = z.object({
    email: emailSchema,
});

export const resetPasswordSchema = z.object({
    token: z.string().min(1, "Token is required"),
    password: passwordSchema,
});

/** @typedef {import("zod").z.infer<typeof loginSchema>} LoginInput */
/** @typedef {import("zod").z.infer<typeof registerSchema>} RegisterInput */
/** @typedef {import("zod").z.infer<typeof changePasswordSchema>} ChangePasswordInput */