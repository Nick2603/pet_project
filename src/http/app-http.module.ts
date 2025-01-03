import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { getHttpConfigOptions } from './get-http-config-options';
import { AppHttpService } from './app-http.service';

@Module({
  imports: [HttpModule.registerAsync(getHttpConfigOptions())],
  providers: [AppHttpService],
  exports: [AppHttpService],
})
export class AppHttpModule {}
