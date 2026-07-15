import { ApiResponse } from "../utils/ApiResponse.js";

// *** Authorisation middleware for admin
export const authorisation = async (req, res, next) => {
    if (req?.user?.role === "admin") {
        return next();
    } else {
        return res
            .status(403)
            .json(new ApiResponse(403, "Access Denied: You are not authorized!!", error));
    }
};