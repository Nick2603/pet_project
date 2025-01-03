import { Module } from '@nestjs/common';
import { ThrottlerConfigService } from './throttler-config.service';
import { AppConfigModule } from 'src/config/app-config.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { getThrottlerConfigOptions } from './get-throttler-config-options';

@Module({
  imports: [
    AppConfigModule,
    ThrottlerModule.forRootAsync(getThrottlerConfigOptions()),
  ],
  providers: [ThrottlerConfigService],
  exports: [ThrottlerConfigService],
})
export class ThrottlerConfigModule {}
