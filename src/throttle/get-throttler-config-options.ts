import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { AppConfigService } from 'src/config/app-config.service';

export const getThrottlerConfigOptions = (
  appConfigService: AppConfigService,
): ThrottlerModuleOptions => ({
  throttlers: [
    {
      ttl: appConfigService.throttleTtl,
      limit: appConfigService.throttleLimit,
    },
  ],
});
