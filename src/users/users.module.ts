import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpModule } from '@nestjs/axios';
import { AppConfigModule } from 'src/config/app-config.module';
import { CronModule } from 'src/cron/cron.module';
import { AppHttpModule } from 'src/http/app-http.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersRepository } from './repositories/users.repository';
import { UsersQueryRepository } from './repositories/users.query-repository';
import { UsersController } from './users.controller';

@Module({
  imports: [
    HttpModule,
    AppConfigModule,
    CronModule,
    AppHttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, UsersRepository, UsersQueryRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
