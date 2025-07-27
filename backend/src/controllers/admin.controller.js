/**
 * Modles
 */
import Doctor from "../modles/doctor.model.js";
import User from "../modles/user.model.js";
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


export const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    
    if (
      [name, email, password, speciality, degree, experience, about, fees, address]
      .some((field) => field?.trim() === "")
    ) {
      return res.status(400).json(new ApiResponse(400, "All fields are required!"));
    }

    if ( !validator.isEmail(email) ) {
      return res.status(400).json(new ApiResponse(400, "Please enter a valid email!"));
    }

    const isDoctorExist = await Doctor.findOne({ email });

    if ( isDoctorExist ) {
      return res.status(409).json(new ApiResponse(409, "Doctor with email alredy exist!"));
    }

    const imageFile = req.file;

    if ( !imageFile ) {
      return res.status(400).json(new ApiResponse(400, "Doctor image is required!"));
    }

    // upload image to cloudinary
    const image = await uploadOnCloudinary(imageFile?.path);

    if ( !image ) {
      return res.status(400).json(new ApiResponse(400, "Doctor image hasn't upload!"));
    }

    const doctor = await Doctor.create({
      name, email, password, speciality, degree, experience, about, fees, address,
      image: image.secure_url
    });

    const createdDoctor = await Doctor.findById(doctor._id).select("-password");

    if ( !createdDoctor ) {
      return res.status(400).json(new ApiResponse(400, "Somthing went wrong while registring doctor!"));
    }

    return res.status(201).json(new ApiResponse(201, "Doctor registered successfully!", createdDoctor));
  } catch (error) {
    console.log("Add doctor error:", error);
    return res.status(500).json(new ApiResponse(500, error?.message, error));
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if ( !email || !password ) {
      return res.status(400).json(new ApiResponse(400, "All fields are required!"));
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json(new ApiResponse(400, "Please provide a valid email"));
    }

    const user = await User.findOne({ email });
    if ( !user ) {
      return res.status(404).json(new ApiResponse(404, "Admin with credential hasn't exist!"));
    }
    
    const isValidPassword = await user.isPasswordCorrect(password);
    if ( !isValidPassword ) {
      return res.status(404).json(new ApiResponse(401, "Invalid admin credentials!"));
    }

    if ( user.role !== "admin" ) {
      return res.status(400).json(new ApiResponse(400, "Access denied unthorisation!"))
    }
    
    const token = jwt.sign(
      { _id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY } 
    );

    return res.status(200).json(new ApiResponse(200, "Admin login successfully!", token));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error?.message, error));
  }
}

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");
    return res.status(200).json(new ApiResponse(200, "Successfully fetched all doctors", doctors));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error?.message, error));
  }
}

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({})
      .populate("user", "name email image dob")
      .populate("doctor", "name email image fees")
      .sort({ "createdAt": -1 });

    return res.status(200).json(new ApiResponse(200, "Appointments fetched", appointments));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error?.message, error));
  }
}

export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json(new ApiResponse(404, "Appointment not found!"));
    }

    appointment.cancel = true;
    await appointment.save();

    const { slotDate, slotTime, doctor } = appointment;
    
    const doc = await Doctor.findById(doctor);
    const slotsBooked = doc.slotsBooked;

    const index = slotsBooked[slotDate].findIndex(slot => slot === slotTime);
    slotsBooked[slotDate].splice(index, 1);

    await Doctor.findByIdAndUpdate(doctor, { slotsBooked });

    return res.status(200).json(new ApiResponse(200, "Appointment canceled"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error?.message, error));
  }
}

export const dashboard = async (req, res) => {
  try {
    const doctor = await Doctor.find({}).countDocuments();
    const user = await User.find({}).countDocuments();
    const appointment = await Appointment.find({}).countDocuments();

    return res.status(200).json(
      new ApiResponse(200, "success", { doctor, user, appointment })
    );
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error?.message, error));
  }
}
