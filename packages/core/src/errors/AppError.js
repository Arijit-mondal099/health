/**
 * Base class for operational, application-specific errors.
 * @module errors/AppError
 */

/**
 * @typedef {Object} AppErrorOptions
 * @property {string} [code] Machine-readable error code.
 * @property {boolean} [isOperational=true] Marks the error as expected (vs programmer error).
 * @property {unknown} [details] Additional structured context.
 */

export class AppError extends Error {
    /**
     * @param {string} message Human-readable message.
     * @param {number} [statusCode=500] HTTP status code.
     * @param {AppErrorOptions} [options]
     */
    constructor(message, statusCode = 500, options = {}) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.code = options.code ?? "INTERNAL_ERROR";
        this.isOperational = options.isOperational ?? true;
        if (options.details !== undefined) this.details = options.details;
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}