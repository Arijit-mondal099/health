/**
 * Raised when an authenticated principal lacks permission (HTTP 403).
 * @module errors/AuthorizationError
 */

import { AppError } from "./AppError.js";

export class AuthorizationError extends AppError {
    /**
     * @param {string} [message]
     * @param {import("./AppError.js").AppErrorOptions} [options]
     */
    constructor(message = "Forbidden", options = {}) {
        super(message, 403, { code: options.code ?? "AUTHORIZATION_ERROR", ...options });
    }
}