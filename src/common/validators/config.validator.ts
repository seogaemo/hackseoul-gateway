import Joi from "joi";

export const ConfigValidator = Joi.object({
  PORT: Joi.number().default(80),
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),
});
