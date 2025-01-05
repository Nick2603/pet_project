import { CacheOptions, CacheStore } from '@nestjs/cache-manager';
import { AppConfigService } from 'src/config/app-config.service';
import { redisStore } from 'cache-manager-redis-yet';

export const getCacheConfigOptions = async (
  appConfigService: AppConfigService,
): Promise<CacheOptions> => {
  const store = await redisStore({
    username: appConfigService.redisUsername,
    password: appConfigService.redisPassword,
    socket: {
      host: appConfigService.redisHost,
      port: appConfigService.redisPort,
    },
  });

  return {
    store: store as unknown as CacheStore,
    ttl: appConfigService.redisTtl,
  };
};
