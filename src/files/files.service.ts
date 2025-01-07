import { Injectable } from '@nestjs/common';
import { FilesRepository } from './repositories/files.repository';

@Injectable()
export class FilesService {
  constructor(private readonly filesRepository: FilesRepository) {}
  async save(file: Express.Multer.File) {
    return this.filesRepository.saveInDb(file);
  }

  async read(filename: string) {
    return this.filesRepository.readFromDb(filename);
  }

  async updateUserAvatar(file: Express.Multer.File, username: string) {
    return this.filesRepository.uploadAvatarForUser(file, username);
  }
}
