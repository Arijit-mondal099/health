/**
 * Appointment feature schemas.
 * @module schemas/appointment
 */

import { z } from "zod";
import { objectIdSchema, slotDateSchema, paginationSchema } from "./common.js";
import { APPOINTMENT_STATUS } from "../constants/index.js";

export const appointmentStatusEnum = z.enum(APPOINTMENT_STATUS);

export const createAppointmentSchema = z.object({
    userId: objectIdSchema,
    doctorId: objectIdSchema,
    slotDate: slotDateSchema,
    slotTime: z.string().min(1, "Slot time is required"),
    amount: z.string().min(1, "Amount is required"),
});

export const appointmentQuerySchema = paginationSchema.extend({
    status: appointmentStatusEnum.optional(),
    doctorId: objectIdSchema.optional(),
    userId: objectIdSchema.optional(),
});

export const updateAppointmentSchema = z
    .object({
        cancel: z.boolean().optional(),
        payment: z.boolean().optional(),
        isCompleted: z.boolean().optional(),
    })
    .partial();

/** @typedef {import("zod").z.infer<typeof createAppointmentSchema>} CreateAppointmentInput */
/** @typedef {import("zod").z.infer<typeof appointmentQuerySchema>} AppointmentQueryInput */
/** @typedef {import("zod").z.infer<typeof updateAppointmentSchema>} UpdateAppointmentInput */