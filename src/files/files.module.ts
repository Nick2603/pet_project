import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config/app-config.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FilesRepository } from './repositories/files.repository';
import { UsersModule } from 'src/users/users.module';
import { FilesImagesBucketRepository } from './repositories/files.images-bucket.repository';

@Module({
  imports: [AppConfigModule, UsersModule],
  providers: [FilesService, FilesRepository, FilesImagesBucketRepository],
  controllers: [FilesController],
})
export class FilesModule {}
