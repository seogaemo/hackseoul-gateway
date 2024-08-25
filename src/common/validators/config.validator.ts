import Joi from "joi";

export const ConfigValidator = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),

  GATEWAY_URL: Joi.string().default("https://hackseoul.plebea.com"),
});
