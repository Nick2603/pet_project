import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config/app-config.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FilesRepository } from './files.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [AppConfigModule, UsersModule],
  providers: [FilesService, FilesRepository],
  controllers: [FilesController],
})
export class FilesModule {}
