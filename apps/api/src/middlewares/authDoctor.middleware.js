import Doctor from "../modles/doctor.model.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * auth check middleware for doctor
 */
export const authDoctor = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json(new ApiResponse(401, "Unauthorized request!"));
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const doctor = await Doctor.findById(decodedToken.id);

        if (!doctor) {
            return res.status(401).json(new ApiResponse(401, "Unauthorized request!"));
        }

        req.doctor = doctor;
        return next();
    } catch (error) {
        console.error("Error :: Doctor Auth:", error.message);
        return res.status(401).json(new ApiResponse(401, "Invalid or expired token!", error));
    }
};