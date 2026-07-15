/**
 * User feature schemas.
 * @module schemas/user
 */

import { z } from "zod";
import { emailSchema, passwordSchema, objectIdSchema } from "./common.js";
import { USER_ROLES, GENDERS } from "../constants/index.js";

export const userRoleEnum = z.enum(USER_ROLES);
export const genderEnum = z.enum(GENDERS);

export const userSchema = z.object({
    _id: objectIdSchema.optional(),
    name: z.string().min(1, "Name is required"),
    email: emailSchema,
    password: passwordSchema,
    image: z.string().optional(),
    address: z.string().optional(),
    gender: genderEnum.default("not selected"),
    dob: z.string().optional(),
    phone: z.string().optional(),
    role: userRoleEnum.default("user"),
});

export const updateUserSchema = userSchema.partial().omit({ _id: true });

/** Public user shape (no password). */
export const publicUserSchema = userSchema.omit({ password: true, _id: true });

/** @typedef {import("zod").z.infer<typeof userSchema>} UserInput */
/** @typedef {import("zod").z.infer<typeof updateUserSchema>} UpdateUserInput */
/** @typedef {import("zod").z.infer<typeof publicUserSchema>} PublicUser */