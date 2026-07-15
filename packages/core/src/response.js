/**
 * Standard API response envelope.
 * @module response
 *
 * Wire contract (consumed by `apps/web` + `apps/admin`):
 *   - `status`    — HTTP status code
 *   - `success`   — `true` when `status < 400`
 *   - `message`   — human-readable text (clients read `data.message`)
 *   - `response`  — the payload (clients read `data.response`)
 *
 * The legacy `apps/api` copy used a misspelled `massage` field and a
 * `data` payload field; both frontends read `message` + `response`, so
 * this envelope must keep those exact names. Do not rename them.
 */

/* eslint-disable typescript/no-extraneous-class -- DTO envelope, constructor-only by design */
export class ApiResponse {
    /**
     * @param {number} status HTTP status code.
     * @param {string} [message="success"] Human-readable message.
     * @param {unknown} [response={}] Response payload.
     */
    constructor(status, message = "success", response = {}) {
        this.status = status;
        this.message = message;
        this.success = status < 400;
        this.response = response;
    }
}