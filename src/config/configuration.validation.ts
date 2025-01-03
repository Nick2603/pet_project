import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().port(),
  NODE_ENV: Joi.string().valid('development', 'production'),
  HTTP_TIMEOUT: Joi.number(),
  HTTP_MAX_REDIRECTS: Joi.number(),
  USERS_URL: Joi.string().uri().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_URL: Joi.string().uri().required(),
});

export const validationOptions = {
  abortEarly: true,
};
