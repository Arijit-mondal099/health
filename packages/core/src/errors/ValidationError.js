/**
 * Raised when request validation fails (maps to HTTP 400).
 * @module errors/ValidationError
 */

import { AppError } from "./AppError.js";

export class ValidationError extends AppError {
    /**
     * @param {string} [message]
     * @param {import("zod").ZodIssue[]} [issues] Zod issues describing the failures.
     * @param {import("./AppError.js").AppErrorOptions} [options]
     */
    constructor(message = "Validation failed", issues = [], options = {}) {
        super(message, 400, { code: options.code ?? "VALIDATION_ERROR", ...options });
        this.issues = issues;
        this.details = issues;
    }
}