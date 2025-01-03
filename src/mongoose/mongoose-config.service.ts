import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { AppConfigService } from 'src/config/app-config.service';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.appConfigService.dbUrl,
    };
  }
}
