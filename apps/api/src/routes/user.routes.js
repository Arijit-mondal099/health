import express from "express";
const router = express.Router();

/**
 * Controllers
 */
import {
    appointmentBooking,
    cancelAppointment,
    getUser,
    getUserAppointments,
    loginUser,
    onlinePayment,
    registerUser,
    updateUserProfile,
    validPayment,
} from "../controllers/user.controller.js";

/**
 * Middlewares
 */
import { authUser } from "../middlewares/authUser.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "@health/core/schemas/auth";

router.route("/register").post(validateBody(registerSchema), registerUser);
router.route("/login").post(validateBody(loginSchema), loginUser);

router.route("/").get(authUser, getUser);
router.route("/update-profile").patch(authUser, upload.single("image"), updateUserProfile);
router.route("/book-appointment").post(authUser, appointmentBooking);
router.route("/appointments").get(authUser, getUserAppointments);
router.route("/cancel-appointment/:appointmentId").get(authUser, cancelAppointment);

router.route("/online-payment").post(authUser, onlinePayment);
router.route("/valid-payment").post(authUser, validPayment);

export default router;