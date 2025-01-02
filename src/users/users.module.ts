import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpModule } from '@nestjs/axios';
import { AppConfigModule } from 'src/config/app-config.module';
import { CronModule } from 'src/cron/cron.module';

@Module({
  imports: [HttpModule, AppConfigModule, CronModule],
  providers: [UsersService],
})
export class UsersModule {}
