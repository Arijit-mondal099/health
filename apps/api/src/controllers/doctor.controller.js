/**
 * Modles
 */
import Doctor from "../modles/doctor.model.js";
import Appointment from "../modles/appointment.model.js";

/**
 * Packages
 */
import validator from "validator";
import jwt from "jsonwebtoken";

/**
 * Utils
 */
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(new ApiResponse(400, "Please provide all data!"));
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json(new ApiResponse(400, "Please provide valid email!"));
        }

        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(404).json(new ApiResponse(404, "Invalid email or password!"));
        }

        const isValidPassword = await doctor.isPasswordCorrect(password);
        if (!isValidPassword) {
            return res.status(401).json(new ApiResponse(401, "Invalid email or password!"));
        }

        const payload = {
            id: doctor._id,
            email: doctor.email,
        };

        const doctorToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY,
        });

        return res
            .status(200)
            .json(new ApiResponse(200, "Doctor login successfully!", doctorToken));
    } catch (error) {
        console.error("Error :: Doctor Login:", error.message);
        return res.status(500).json(new ApiResponse(500, error?.message, error));
    }
};

export const toggleAvailblity = async (req, res) => {
    try {
        const { id } = req.body;

        const doctor = await Doctor.findById(id).select("-password");

        if (!doctor) {
            return res.status(404).json(new ApiResponse(404, "Doctor not found"));
        }

        doctor.available = !doctor.available;
        await doctor.save();

        return res.status(200).json(new ApiResponse(200, "Availability toggled", doctor));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message, error));
    }
};

export const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).select("-password -email");
        return res.status(200).json(new ApiResponse(200, "All doctors fetched", doctors));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message, error));
    }
};

export const getDoctorAllAppointments = async (req, res) => {
    try {
        const { _id } = req.doctor;

        const appointments = await Appointment.find({ doctor: _id })
            .populate("user", "name email image phone dob")
            .populate("doctor", "fees")
            .sort({ createdAt: -1 });

        return res.status(200).json(new ApiResponse(200, "Appointments fetched", appointments));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message, error));
    }
};

export const completedAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const { _id } = req.doctor;

        const appointment = await Appointment.findById(appointmentId);
        if (appointment && appointment.doctor.toString() !== _id.toString()) {
            return res.status(401).json(new ApiResponse(401, "Unauthorized to update!"));
        }

        await Appointment.findByIdAndUpdate(appointmentId, { isCompleted: true });

        return res.status(200).json(new ApiResponse(200, "Completed", appointment));
    } catch (error) {
        console.error("Error completedAppointment ::", error.message);
        return res.status(500).json(new ApiResponse(500, error?.message, error));
    }
};

export const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const { _id } = req.doctor;

        const appointment = await Appointment.findById(appointmentId);
        if (appointment && appointment.doctor.toString() !== _id.toString()) {
            return res.status(401).json(new ApiResponse(401, "Unauthorized to update!"));
        }

        await Appointment.findByIdAndUpdate(appointmentId, { cancel: true });

        return res.status(200).json(new ApiResponse(200, "Canceled", appointment));
    } catch (error) {
        console.error("Error cancelAppointment ::", error.message);
        return res.status(500).json(new ApiResponse(500, error?.message, error));
    }
};

export const getDoctorDashboard = async (req, res) => {
    try {
        const { _id } = req.doctor;

        const appointments = await Appointment.find({ doctor: _id });
        if (!appointments) {
            return res.status(404).json(new ApiResponse(404, "Doctor appointmrnts not found!"));
        }

        let earnings = 0;
        appointments.map((appoi) =>
            appoi.isCompleted || appoi.payment ? (earnings += Number(appoi.amount)) : 0,
        );

        const patients = [];
        appointments.map((appoi) =>
            !patients.includes(appoi.user.toString()) ? patients.push(appoi.user.toString()) : null,
        );

        let complete = 0;
        appointments.map((appoi) => (appoi.isCompleted ? (complete += 1) : 0));

        let cancel = 0;
        appointments.map((appoi) => (appoi.cancel ? (cancel += 1) : 0));

        return res.status(200).json(
            new ApiResponse(200, "Fetched successfully", {
                earnings,
                patients,
                complete,
                cancel,
                appointments: appointments.length,
            }),
        );
    } catch (error) {
        console.error("Error getDoctorDashboard ::", error.message);
        return res.status(500).json(new ApiResponse(500, error?.message, error));
    }
};

export const getDoctorProfile = async (req, res) => {
    try {
        const { _id } = req.doctor;

        const doctor = await Doctor.findById(_id).select("-password");
        if (!doctor) {
            return res.status(404).json(new ApiResponse(404, "Doctor not found!"));
        }

        return res.status(200).json(new ApiResponse(200, "Fetched successfully", doctor));
    } catch (error) {
        console.error("Error getDoctorProfile ::", error.message);
        return res.status(500).json(new ApiResponse(500, error?.message, error));
    }
};

export const updateDoctorProfile = async (req, res) => {
    try {
        const { name, speciality, degree, experience, about, available, fees, address } = req.body;
        const imageFile = req.file;
        const { _id } = req.doctor;

        const doctor = await Doctor.findById(_id).select("-password");
        if (!doctor) {
            return res.status(404).json(new ApiResponse(404, "Doctor not found!"));
        }

        let image = doctor.image;
        if (imageFile) {
            image = await uploadOnCloudinary(imageFile.path);
        }

        const data = {
            name: name || doctor.name,
            image: image?.secure_url || doctor.image,
            speciality: speciality || doctor.speciality,
            degree: degree || doctor.degree,
            experience: experience || doctor.experience,
            about: about || doctor.about,
            available: available || doctor.available,
            fees: fees || doctor.fees,
            address: address || doctor.address,
        };

        const updatedDoctor = await Doctor.findByIdAndUpdate(_id, data, { new: true }).select(
            "-password",
        );

        return res
            .status(200)
            .json(new ApiResponse(200, "Profile update successfylly", updatedDoctor));
    } catch (error) {
        console.error("Error updateDoctorProfile ::", error.message);
        return res.status(500).json(new ApiResponse(500, error?.message, error));
    }
};