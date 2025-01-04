import { Injectable, StreamableFile } from '@nestjs/common';
import { FilesRepository } from './files.repository';

@Injectable()
export class FilesService {
  constructor(private readonly filesRepository: FilesRepository) {}
  save(file: Express.Multer.File): Promise<void> {
    return this.filesRepository.save(file);
  }

  readFileStream(filename: string): Promise<StreamableFile> {
    return this.filesRepository.readFileStream(filename);
  }
}
