import { getMongooseConfigOptions } from './get-mongoose-config-options';
import { Module } from '@nestjs/common';
import { MongooseConfigService } from './mongoose-config.service';
import { AppConfigModule } from 'src/config/app-config.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync(getMongooseConfigOptions()),
  ],
  providers: [MongooseConfigService],
  exports: [MongooseConfigService],
})
export class MongooseConfigModule {}
