import User from "../modles/user.model.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * auth check middleware for user
 */
export const authUser = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json(new ApiResponse(401, "Unauthorized request!"));
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id).select("-password");

        if (!user) {
            return res.status(401).json(new ApiResponse(401, "Unauthorized request!"));
        }

        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json(new ApiResponse(401, "Invalid or expired token!", error));
    }
};