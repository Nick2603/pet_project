import { HttpModuleOptions } from '@nestjs/axios';
import { AppConfigService } from 'src/config/app-config.service';

export const getHttpConfigOptions = (
  appConfigService: AppConfigService,
): HttpModuleOptions => ({
  timeout: appConfigService.httpTimeout,
  maxRedirects: appConfigService.httpMaxRedirects,
});
