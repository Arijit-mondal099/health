/**
 * Raised when a request conflicts with current state (HTTP 409).
 * @module errors/ConflictError
 */

import { AppError } from "./AppError.js";

export class ConflictError extends AppError {
    /**
     * @param {string} [message]
     * @param {import("./AppError.js").AppErrorOptions} [options]
     */
    constructor(message = "Conflict", options = {}) {
        super(message, 409, { code: options.code ?? "CONFLICT", ...options });
    }
}