/**
 * Node modules
 */
import mongoose from "mongoose";

/**
 * Appointment schema
 */
const appointmentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },
        slotDate: {
            type: String,
            required: true,
        },
        slotTime: {
            type: String,
            required: true,
        },
        amount: {
            type: String,
            required: true,
        },
        cancel: {
            type: Boolean,
            default: false,
        },
        payment: {
            type: Boolean,
            default: false,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

/**
 * Appointment model
 */
const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);
export default Appointment;