import { Module } from '@nestjs/common';
import { HttpConfigService } from './http-config.service';
import { AppConfigModule } from 'src/config/app-config.module';

@Module({
  imports: [AppConfigModule],
  providers: [HttpConfigService],
  exports: [HttpConfigService],
})
export class HttpConfigModule {}
