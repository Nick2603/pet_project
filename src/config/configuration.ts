import { registerAs } from '@nestjs/config';

type nodeEnvType = 'development' | 'production';

export default registerAs('configuration', () => ({
  port: parseInt(process.env.PORT as string, 10) || 4000,
  nodeEnv: (process.env.NODE_ENV || 'production') as nodeEnvType,
  httpTimeout: parseInt(process.env.HTTP_TIMEOUT as string, 10) || 5000,
  httpMaxRedirects: parseInt(process.env.HTTP_MAX_REDIRECTS as string, 10) || 5,
  usersUrl: process.env.USERS_URL as string,
}));
