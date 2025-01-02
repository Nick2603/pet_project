import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './config/app-config.module';
import { getAppConfigOptions } from './config/get-app-config-options';
import { HttpModule } from '@nestjs/axios';
import { getHttpConfigOptions } from './http/get-http-config-options';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(getAppConfigOptions()),
    AppConfigModule,
    HttpModule.registerAsync(getHttpConfigOptions()),
    UsersModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
