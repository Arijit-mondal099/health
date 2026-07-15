/**
 * Raised for unexpected server-side failures (HTTP 500).
 * @module errors/InternalError
 */

import { AppError } from "./AppError.js";

export class InternalError extends AppError {
    /**
     * @param {string} [message]
     * @param {import("./AppError.js").AppErrorOptions} [options]
     */
    constructor(message = "Internal server error", options = {}) {
        super(message, 500, {
            code: options.code ?? "INTERNAL_ERROR",
            isOperational: options.isOperational ?? false,
            ...options,
        });
    }
}