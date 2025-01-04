import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { getHttpConfigOptions } from './get-http-config-options';
import { AppHttpService } from './app-http.service';
import { AppConfigModule } from 'src/config/app-config.module';
import { AppConfigService } from 'src/config/app-config.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: getHttpConfigOptions,
    }),
  ],
  providers: [AppHttpService],
  exports: [AppHttpService],
})
export class AppHttpModule {}
