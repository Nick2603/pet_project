import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import configuration from './configuration';

@Injectable()
export class AppConfigService {
  constructor(
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
  ) {}

  get port() {
    return this.config.port;
  }

  get isDev() {
    return this.config.nodeEnv === 'development';
  }

  get httpTimeout() {
    return this.config.httpTimeout;
  }

  get httpMaxRedirects() {
    return this.config.httpMaxRedirects;
  }

  get usersUrl() {
    return this.config.usersUrl;
  }
}
