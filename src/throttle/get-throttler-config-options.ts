import { ThrottlerAsyncOptions } from '@nestjs/throttler';
import { ThrottlerConfigModule } from './throttler-config.module';
import { ThrottlerConfigService } from './throttler-config.service';

export const getThrottlerConfigOptions = (): ThrottlerAsyncOptions => ({
  imports: [ThrottlerConfigModule],
  useExisting: ThrottlerConfigService,
});
