import Joi from "joi";

/**
 * Schemas for data validation in forms.
 */

export const registrationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(4).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
