/**
 * Appointment status constants and helpers.
 * @module constants/appointment
 *
 * Appointment status is derived (not stored) from the `cancel` and
 * `isCompleted` flags on an appointment document.
 */

/** Canonical appointment statuses, in display order. */
export const APPOINTMENT_STATUS = Object.freeze(["completed", "canceled", "pending"]);

/**
 * Derive the effective status of an appointment.
 * @param {{ cancel?: boolean, isCompleted?: boolean }} appointment
 * @returns {"completed" | "canceled" | "pending"}
 */
export const getAppointmentStatus = (appointment) => {
    if (appointment?.cancel) return "canceled";
    if (appointment?.isCompleted) return "completed";
    return "pending";
};