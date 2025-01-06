import type { MulterModuleOptions } from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';
import { AppConfigService } from 'src/config/app-config.service';

export const getMulterConfigOptions = (
  appConfigService: AppConfigService,
): MulterModuleOptions => ({
  storage: new GridFsStorage({
    url: appConfigService.dbUrl,
    file: (_, file) => ({
      filename: file.originalname,
    }),
  }),
});
