import {
  CacheModuleOptions,
  CacheOptionsFactory,
  CacheStore,
} from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';
import { AppConfigService } from 'src/config/app-config.service';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  async createCacheOptions(): Promise<CacheModuleOptions> {
    const store = await redisStore({
      username: this.appConfigService.redisUsername,
      password: this.appConfigService.redisPassword,
      socket: {
        host: this.appConfigService.redisHost,
        port: this.appConfigService.redisPort,
      },
    });

    return {
      store: store as unknown as CacheStore,
      ttl: this.appConfigService.redisTtl,
    };
  }
}
