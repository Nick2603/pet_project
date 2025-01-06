import type { ConfigModuleOptions } from '@nestjs/config';
import {
  validationSchema,
  validationOptions,
} from './configuration.validation';
import configuration from './configuration';

export const getAppConfigOptions = (): ConfigModuleOptions => ({
  load: [configuration],
  envFilePath: ['.env.development'],
  cache: true,
  expandVariables: true,
  validationSchema,
  validationOptions,
});
