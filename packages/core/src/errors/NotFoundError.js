/**
 * Raised when a requested resource does not exist (HTTP 404).
 * @module errors/NotFoundError
 */

import { AppError } from "./AppError.js";

export class NotFoundError extends AppError {
    /**
     * @param {string} [message]
     * @param {import("./AppError.js").AppErrorOptions} [options]
     */
    constructor(message = "Not found", options = {}) {
        super(message, 404, { code: options.code ?? "NOT_FOUND", ...options });
    }
}