import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpModule } from '@nestjs/axios';
import { AppConfigModule } from 'src/config/app-config.module';

@Module({
  imports: [HttpModule, AppConfigModule],
  providers: [UsersService],
})
export class UsersModule {}
