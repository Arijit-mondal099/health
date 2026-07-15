import { parseWith } from "@health/core/schemas/validate";

/**
 * Express middleware factory that validates `req[target]` against a schema,
 * throwing a `ValidationError` (handled by the global error middleware).
 * On success the parsed value is attached to `req.validated`.
 *
 * @param {import("zod").ZodTypeAny} schema
 * @param {"body"|"query"|"params"} [target="body"]
 */
export const validate =
    (schema, target = "body") =>
    (req, res, next) => {
        try {
            req.validated = parseWith(schema, req[target]);
            next();
        } catch (error) {
            next(error);
        }
    };

export const validateBody = (schema) => validate(schema, "body");
export const validateQuery = (schema) => validate(schema, "query");
export const validateParams = (schema) => validate(schema, "params");