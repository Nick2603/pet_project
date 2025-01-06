import type { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { AppConfigService } from 'src/config/app-config.service';

export const getMongooseConfigOptions = (
  appConfigService: AppConfigService,
): MongooseModuleFactoryOptions => ({
  uri: appConfigService.dbUrl,
});
