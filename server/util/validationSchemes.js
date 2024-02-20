import joi from "joi";

import { userRole } from "../environments/constants.js";

const commonPasswordMessages = {
  "string.base": "Password must be a string",
  "string.pattern.base":
    "Password must contain at least one lowercase letter, one uppercase letter, and one digit",
  "string.empty": "Password is required",
  "string.trim": "Password cannot contain leading or trailing spaces",
  "string.max": "Password cannot be longer than {#limit} characters",
};

const passwordSchema = joi
  .string()
  .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,20}$/)
  .required()
  .trim()
  .messages(commonPasswordMessages);

const validateRegisterSchema = joi.object({
  firstName: joi.string().required().trim().max(100),
  lastName: joi.string().required().trim().max(100),
  email: joi.string().required().trim().email().lowercase(),
  phone: joi
    .string()
    .required()
    .regex(
      /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/
    ),
  role: joi
    .string()
    .allow("")
    .optional()
    .valid(userRole.admin, userRole.user, userRole.instructor)
    .trim()
    .lowercase(),
  password: passwordSchema,
});

const validateLoginSchema = joi.object({
  email: joi.string().required().trim().email().lowercase(),
  password: passwordSchema,
});

const validateResetPasswordSchema = joi.object({
  password: passwordSchema,
  resetToken: joi.string().required().trim(),
});

export {
  validateRegisterSchema,
  validateLoginSchema,
  validateResetPasswordSchema,
};
