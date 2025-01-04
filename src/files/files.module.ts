import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config/app-config.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FilesRepository } from './files.repository';

@Module({
  imports: [AppConfigModule],
  providers: [FilesService, FilesRepository],
  controllers: [FilesController],
})
export class FilesModule {}
