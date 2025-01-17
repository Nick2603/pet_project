import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config.module';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AppHttpModule } from './http/app-http.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from './files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { CacheModule } from '@nestjs/cache-manager';
import { MongooseConfigService } from './mongoose/MongooseConfigService';
import { CacheConfigService } from './cache/CacheConfigService';
import { MulterConfigService } from './multer/MulterConfigService';
import { ThrottlerConfigService } from './throttle/ThrottlerConfigService';

@Module({
  imports: [
    AppConfigModule,
    AppHttpModule,
    UsersModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useClass: MongooseConfigService,
    }),
    ThrottlerModule.forRootAsync({
      imports: [AppConfigModule],
      useClass: ThrottlerConfigService,
    }),
    FilesModule,
    MulterModule.registerAsync({
      imports: [AppConfigModule],
      useClass: MulterConfigService,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [AppConfigModule],
      useClass: CacheConfigService,
    }),
  ],
})
export class AppModule {}
