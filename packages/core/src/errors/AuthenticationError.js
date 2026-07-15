/**
 * Raised when authentication is missing or invalid (HTTP 401).
 * @module errors/AuthenticationError
 */

import { AppError } from "./AppError.js";

export class AuthenticationError extends AppError {
    /**
     * @param {string} [message]
     * @param {import("./AppError.js").AppErrorOptions} [options]
     */
    constructor(message = "Unauthorized", options = {}) {
        super(message, 401, { code: options.code ?? "AUTHENTICATION_ERROR", ...options });
    }
}