/**
 * Modles
 */
import User from "../modles/user.model.js";
import Doctor from "../modles/doctor.model.js";
import Appointment from "../modles/appointment.model.js";

/**
 * Packages
 */
import jwt from "jsonwebtoken";
import validator from "validator";

/**
 * Utils
 */
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { razorpayIntance } from "../utils/razorpay.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json(new ApiResponse(400, "All fields are required!"));
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json(new ApiResponse(400, "Please provide a valid email"));
        }

        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res
                .status(400)
                .json(new ApiResponse(400, "User alredy exist with credintials!"));
        }

        const user = await User.create({ name, email, password });

        const createdUser = await User.findById(user._id).select("-password");
        if (!createdUser) {
            return res
                .status(400)
                .json(new ApiResponse(400, "Somthing went wrong while registring user!"));
        }

        const payload = {
            id: createdUser._id,
            email: createdUser.email,
            name: createdUser.name,
            role: createdUser.role,
        };

        const userToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY,
        });

        return res
            .status(201)
            .json(new ApiResponse(201, "User registered successfully", userToken));
    } catch (error) {
        console.error("Error :: registerUser", error.message);
        return res.status(500).json(new ApiResponse(500, error?.message, error));
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(new ApiResponse(400, "All fields are required!"));
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json(new ApiResponse(400, "Please provide a valid email"));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json(new ApiResponse(404, "User with credential hasn't exist!"));
        }

        const isValidPassword = await user.isPasswordCorrect(password);
        if (!isValidPassword) {
            return res.status(401).json(new ApiResponse(401, "Invalid admin credentials!"));
        }

        const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        };

        const userToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY,
        });

        return res
            .status(200)
            .json(new ApiResponse(200, "User registered successfully", userToken));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message, error));
    }
};

export const getUser = async (req, res) => {
    try {
        const { _id } = req.user;

        const user = await User.findById(_id).select("-password");
        if (!user) {
            return res.status(404).json(new ApiResponse(404, "User not found!"));
        }

        return res.status(200).json(new ApiResponse(200, "User fetched", user));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message, error));
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { name, address, gender, dob, phone } = req.body;
        const imageFile = req.file;
        const { id } = req.user;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json(new ApiResponse(404, "User not found!"));
        }

        let imageUrl = user?.image;
        if (imageFile) {
            const image = await uploadOnCloudinary(imageFile.path);
            if (image?.secure_url) imageUrl = image.secure_url;
        }

        user.name = name !== undefined ? name : user.name;
        user.address = address !== undefined ? address : user.address;
        user.gender = gender !== undefined ? gender : user.gender;
        user.dob = dob !== undefined ? dob : user.dob;
        user.phone = phone !== undefined ? phone : user.phone;
        user.image = imageUrl;

        await user.save();

        return res.status(200).json(new ApiResponse(200, "User updated successfully", user));
    } catch (error) {
        console.error("Error :: updateUserProfile", error.message);
        return res.status(500).json(new ApiResponse(500, error?.message, error));
    }
};

export const appointmentBooking = async (req, res) => {
    try {
        const { doctorId, slotDate, slotTime } = req.body;
        const { _id } = req.user;

        const doctor = await Doctor.findById(doctorId).select("-password");
        if (!doctor) {
            return res.status(404).json(new ApiResponse(404, "Doctor not found!"));
        }
        if (!doctor?.available) {
            return res.status(200).json(new ApiResponse(400, "Doctor is not available!"));
        }

        /**
         * if > booking date available & provided appointment time also booked
         * else if > booking date available & provided appointment time not booked
         * else > booking date not available
         */
        const doctorSlots = doctor?.slotsBooked;

        if (doctorSlots[slotDate] && doctorSlots[slotDate]?.includes(slotTime)) {
            return res.status(400).json(new ApiResponse(400, "Doctor slot is alredy booked!"));
        } else if (doctorSlots[slotDate] && !doctorSlots[slotDate]?.includes(slotTime)) {
            doctorSlots[slotDate]?.push(slotTime);
        } else {
            doctorSlots[slotDate] = [];
            doctorSlots[slotDate]?.push(slotTime);
        }

        await Doctor.findByIdAndUpdate(doctor?._id, { slotsBooked: doctorSlots });

        const appointment = await Appointment.create({
            user: _id,
            doctor: doctor?._id,
            slotDate,
            slotTime,
            amount: doctor?.fees,
        });

        return res
            .status(201)
            .json(new ApiResponse(201, "Appointment booked successfully", appointment));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message, error));
    }
};

export const getUserAppointments = async (req, res) => {
    try {
        const { _id } = req.user;

        const user = await User.findById(_id).select("-password");
        if (!user) {
            return res.status(404).json(new ApiResponse(404, "User not found!"));
        }

        const appointments = await Appointment.find({ user: _id })
            .populate("user", "name email")
            .populate("doctor", "name speciality address image")
            .sort({ createdAt: -1 });

        return res.status(200).json(new ApiResponse(200, "Fetched successfylly", appointments));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message, error));
    }
};

export const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { id } = req.user;

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json(new ApiResponse(404, "Appointment user not found!"));
        }

        if (appointment.user.toString() !== id) {
            return res.status(401).json(new ApiResponse(401, "Access denide!"));
        }

        appointment.cancel = true;
        await appointment.save();

        /**
         * Releasing doctor slot
         */
        const { doctor, slotDate, slotTime } = appointment;

        const doc = await Doctor.findById(doctor);
        const doctorSlots = doc?.slotsBooked;

        const slotIndex = doctorSlots[slotDate].findIndex((slot) => slot === slotTime);
        doctorSlots[slotDate].splice(slotIndex, 1);

        await Doctor.findByIdAndUpdate(doctor, { slotsBooked: doctorSlots });

        return res.status(200).json(new ApiResponse(200, "Appoiniment has canceled"));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, error?.message, error));
    }
};

export const onlinePayment = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment || appointment.cancel) {
            return res
                .status(404)
                .json(new ApiResponse(404, "Appointment has been canceled or not found!"));
        }

        /**
         * Applying razorpay payment intrigation
         * 1: create payment options
         * 2: create order using razorpay
         */
        const option = {
            amount: appointment.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointment._id,
        };
        const order = await razorpayIntance.orders.create(option);

        return res.status(200).json(new ApiResponse(200, "Order has created successfully", order));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, error?.message, error));
    }
};

export const validPayment = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;

        const orderInfo = await razorpayIntance.orders.fetch(razorpay_order_id);
        if (orderInfo.status !== "paid") {
            return res.status(400).json(new ApiResponse(400, "Payment failed!"));
        }

        const appointment = await Appointment.findById(orderInfo?.receipt);
        if (!appointment) {
            return res.status(404).json(new ApiResponse(404, "Appointment not found!"));
        }
        if (appointment.payment) {
            return res.status(400).json(new ApiResponse(400, "Payment failed!"));
        }

        // Mark payment as done
        appointment.payment = true;
        await appointment.save();

        return res.status(200).json(new ApiResponse(200, "Credit added successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message, error));
    }
};