import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './config/app-config.module';
import { getAppConfigOptions } from './config/get-app-config-options';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AppHttpModule } from './http/app-http.module';
import { MongooseConfigModule } from './mongoose/mongoose-config.module';
import { ThrottlerConfigModule } from './throttle/throttler-config.module';

@Module({
  imports: [
    ConfigModule.forRoot(getAppConfigOptions()),
    AppConfigModule,
    AppHttpModule,
    UsersModule,
    ScheduleModule.forRoot(),
    MongooseConfigModule,
    ThrottlerConfigModule,
  ],
})
export class AppModule {}
