import { Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';

@Injectable()
export class FilesService {
  constructor(private readonly filesRepository: FilesRepository) {}
  save(file: Express.Multer.File) {
    return this.filesRepository.saveInDb(file);
  }

  read(filename: string) {
    return this.filesRepository.readFromDb(filename);
  }

  updateUserAvatar(file: Express.Multer.File, username: string) {
    return this.filesRepository.uploadAvatarForUser(file, username);
  }
}
