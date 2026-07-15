import { ApiResponse } from "../utils/ApiResponse.js";
import { ValidationError, AppError } from "@health/core/errors";

/**
 * Express error-handling middleware (must keep the 4-arg signature so
 * Express registers it as an error handler). Converts thrown errors into
 * the standard `ApiResponse` envelope the frontends expect.
 *
 * @param {Error} err
 * @param {import("express").Request} _req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */
// oxlint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
    if (res.headersSent) {
        return _next(err);
    }

    const isProduction = process.env.NODE_ENV === "production";
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let response;

    if (err instanceof ValidationError) {
        statusCode = err.statusCode || 400;
        response = err.issues;
    } else if (err instanceof AppError) {
        statusCode = err.statusCode || 500;
        response = err.details;
    } else if (isProduction) {
        message = "Internal Server Error";
    } else {
        response = err.stack;
    }

    return res.status(statusCode).json(new ApiResponse(statusCode, message, response));
};