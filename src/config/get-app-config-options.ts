import { ConfigModuleOptions } from '@nestjs/config';
import {
  validationSchema,
  validationOptions,
} from './configuration.validation';

export const getAppConfigOptions = (): ConfigModuleOptions => ({
  envFilePath: ['.env.development'],
  cache: true,
  expandVariables: true,
  validationSchema,
  validationOptions,
});
