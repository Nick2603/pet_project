import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppHttpService } from './app-http.service';
import { AppConfigModule } from 'src/config/app-config.module';
import { HttpConfigService } from './HttpConfigService';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [AppConfigModule],
      useClass: HttpConfigService,
    }),
  ],
  providers: [AppHttpService],
  exports: [AppHttpService],
})
export class AppHttpModule {}
