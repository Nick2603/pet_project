import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';
import { AppConfigService } from 'src/config/app-config.service';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: new GridFsStorage({
        url: this.appConfigService.dbUrl,
        file: (_, file) => ({
          filename: file.originalname,
        }),
      }),
    };
  }
}
