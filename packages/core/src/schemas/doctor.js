/**
 * Doctor feature schemas.
 * @module schemas/doctor
 */

import { z } from "zod";
import { emailSchema, passwordSchema, objectIdSchema } from "./common.js";

export const doctorSchema = z.object({
    _id: objectIdSchema.optional(),
    name: z.string().min(1, "Name is required"),
    email: emailSchema,
    password: passwordSchema,
    image: z.string().min(1, "Image is required"),
    speciality: z.string().min(1, "Speciality is required"),
    degree: z.string().min(1, "Degree is required"),
    experience: z.string().min(1, "Experience is required"),
    about: z.string().min(1, "About is required"),
    available: z.boolean().default(true),
    fees: z.coerce.number().positive("Fees must be greater than 0"),
    address: z.string().min(1, "Address is required"),
    slotsBooked: z.record(z.string(), z.array(z.string())).optional(),
});

export const updateDoctorSchema = doctorSchema.partial().omit({ _id: true });

/** @typedef {import("zod").z.infer<typeof doctorSchema>} DoctorInput */
/** @typedef {import("zod").z.infer<typeof updateDoctorSchema>} UpdateDoctorInput */