/**
 * User feature schemas.
 * @module schemas/user
 */

import { z } from "zod";
import { USER_ROLES } from "../constants/index.js";

export const userRoleEnum = z.enum(USER_ROLES);