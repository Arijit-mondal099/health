import express from "express";
const router = express.Router();

/**
 * Controllers
 */
import {
  cancelAppointment,
  completedAppointment,
  doctorLogin,
  getDoctorAllAppointments,
  getDoctorDashboard,
  getDoctorProfile,
  getDoctors,
  updateDoctorProfile,
} from "../controllers/doctor.controller.js";

/**
 * Middlewares
 */
import { authDoctor } from "../middlewares/authDoctor.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";



router.route("/").get(getDoctors);
router.route("/login").post(doctorLogin);

router.route("/appointments").get(authDoctor, getDoctorAllAppointments);
router.route("/complete-appointment").patch(authDoctor, completedAppointment);
router.route("/cancel-appointment").patch(authDoctor, cancelAppointment);
router.route("/dashboard").get(authDoctor, getDoctorDashboard);
router.route("/profile").get(authDoctor, getDoctorProfile);
router.route("/update-profile").patch(authDoctor, upload.single("image"), updateDoctorProfile);


export default router;
