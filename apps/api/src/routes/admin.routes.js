import express from "express";
const router = express.Router();

/**
 * Controllers
 */
import {
    addDoctor,
    cancelAppointment,
    dashboard,
    getAllAppointments,
    getAllDoctors,
    loginAdmin,
} from "../controllers/admin.controller.js";
import { toggleAvailblity } from "../controllers/doctor.controller.js";

/**
 * Middlewares
 */
import { authentication } from "../middlewares/authAdmin.middleware.js";
import { authorisation } from "../middlewares/authorisation.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { loginSchema } from "@health/core/schemas/auth";

router.route("/login").post(validateBody(loginSchema), loginAdmin);

router.route("/add-doctor").post(upload.single("image"), authentication, authorisation, addDoctor);
router.route("/all-doctors").get(authentication, authorisation, getAllDoctors);
router.route("/toggle-availblity").patch(authentication, authorisation, toggleAvailblity);
router.route("/all-appointments").get(authentication, authorisation, getAllAppointments);
router
    .route("/cancel-appointment/:appointmentId")
    .get(authentication, authorisation, cancelAppointment);
router.route("/dashboard").get(authentication, authorisation, dashboard);

export default router;