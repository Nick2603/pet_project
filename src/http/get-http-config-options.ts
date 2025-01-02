import { HttpModuleAsyncOptions } from '@nestjs/axios';
import { HttpConfigModule } from './http-config.module';
import { HttpConfigService } from './http-config.service';

export const getHttpConfigOptions = (): HttpModuleAsyncOptions => ({
  imports: [HttpConfigModule],
  useExisting: HttpConfigService,
});
