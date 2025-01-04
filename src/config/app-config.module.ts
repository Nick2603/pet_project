import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigModule } from '@nestjs/config';
import { getAppConfigOptions } from './get-app-config-options';

@Module({
  imports: [ConfigModule.forRoot(getAppConfigOptions())],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
