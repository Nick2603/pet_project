import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config.module';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AppHttpModule } from './http/app-http.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { getThrottlerConfigOptions } from './throttle/get-throttler-config-options';
import { AppConfigService } from './config/app-config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseConfigOptions } from './mongoose/get-mongoose-config-options';

@Module({
  imports: [
    AppConfigModule,
    AppHttpModule,
    UsersModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: getMongooseConfigOptions,
    }),
    ThrottlerModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: getThrottlerConfigOptions,
    }),
  ],
})
export class AppModule {}
