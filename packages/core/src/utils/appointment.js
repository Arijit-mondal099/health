/**
 * Appointment domain helpers.
 * @module utils/appointment
 */

import { getAppointmentStatus, APPOINTMENT_STATUS } from "../constants/index.js";

export { getAppointmentStatus, APPOINTMENT_STATUS };

/**
 * Count appointments by derived status.
 * @param {Array<{ cancel?: boolean, isCompleted?: boolean }>} appointments
 * @returns {Array<{ status: string, value: number }>}
 */
export const getStatusBreakdown = (appointments = []) => {
    const counts = { completed: 0, canceled: 0, pending: 0 };
    for (const appt of appointments) counts[getAppointmentStatus(appt)] += 1;
    return APPOINTMENT_STATUS.map((status) => ({ status, value: counts[status] }));
};