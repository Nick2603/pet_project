import { MongooseConfigService } from './mongoose-config.service';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { MongooseConfigModule } from './mongoose-config.module';

export const getMongooseConfigOptions = (): MongooseModuleAsyncOptions => ({
  imports: [MongooseConfigModule],
  useExisting: MongooseConfigService,
});
