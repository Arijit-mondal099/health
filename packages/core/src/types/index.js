/* eslint-disable unicorn/no-empty-file -- JSDoc-only type definitions, no runtime code */
/**
 * Shared domain type definitions (JSDoc only — no runtime cost).
 *
 * These mirror the Zod schemas so editors get IntelliSense without a
 * TypeScript build step. If a package adopts TypeScript later, derive
 * types directly via `z.infer<typeof XSchema>` from `@health/core/schemas`.
 *
 * @module types
 */

/**
 * @typedef {Object} User
 * @property {string} [id]
 * @property {string} name
 * @property {string} email
 * @property {string} [image]
 * @property {string} [address]
 * @property {"male"|"female"|"other"|"not selected"} [gender]
 * @property {string} [dob]
 * @property {string} [phone]
 * @property {"user"|"admin"} [role]
 */

/**
 * @typedef {Object} Doctor
 * @property {string} [id]
 * @property {string} name
 * @property {string} email
 * @property {string} image
 * @property {string} speciality
 * @property {string} degree
 * @property {string} experience
 * @property {string} about
 * @property {boolean} [available]
 * @property {number} fees
 * @property {string} address
 * @property {Record<string, string[]>} [slotsBooked]
 */

/**
 * @typedef {Object} Appointment
 * @property {string} userId
 * @property {string} doctorId
 * @property {string} slotDate
 * @property {string} slotTime
 * @property {string} amount
 * @property {boolean} [cancel]
 * @property {boolean} [payment]
 * @property {boolean} [isCompleted]
 */

/**
 * @typedef {Object} ApiResponseLike
 * @property {number} status
 * @property {string} message
 * @property {boolean} success
 * @property {unknown} data
 */