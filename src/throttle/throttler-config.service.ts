import { Injectable } from '@nestjs/common';
import {
  ThrottlerModuleOptions,
  ThrottlerOptionsFactory,
} from '@nestjs/throttler';
import { AppConfigService } from 'src/config/app-config.service';

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createThrottlerOptions(): ThrottlerModuleOptions {
    return {
      throttlers: [
        {
          ttl: this.appConfigService.throttleTtl,
          limit: this.appConfigService.throttleLimit,
        },
      ],
    };
  }
}
