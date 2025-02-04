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
  THROTTLE_TTL: Joi.number(),
  THROTTLE_LIMIT: Joi.number(),
  FILE_UPLOAD_FOLDER: Joi.string(),
  REDIS_USERNAME: Joi.string().required(),
  REDIS_PASSWORD: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_TTL: Joi.number().required(),
});

export const validationOptions = {
  abortEarly: true,
};
