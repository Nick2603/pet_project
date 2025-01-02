import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/config/app-config.service';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}
  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: this.appConfigService.httpTimeout,
      maxRedirects: this.appConfigService.httpMaxRedirects,
    };
  }
}
