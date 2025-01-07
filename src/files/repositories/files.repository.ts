import { Injectable, StreamableFile } from '@nestjs/common';
import * as path from 'node:path';
import * as fsPromises from 'node:fs/promises';
import * as fs from 'node:fs';
import { AppConfigService } from 'src/config/app-config.service';
import { GridFSBucketReadStream, type ObjectId } from 'mongodb';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { FilesImagesBucketRepository } from './files.images-bucket.repository';

@Injectable()
export class FilesRepository {
  constructor(
    @InjectConnection() private connection: Connection,
    private readonly appConfigService: AppConfigService,
    private readonly userService: UsersService,
    private readonly filesImagesBucketRepository: FilesImagesBucketRepository,
  ) {}
  /**
   * Used to save files in local file system
   */
  async saveLocally({
    originalname,
    buffer,
  }: Express.Multer.File): Promise<void> {
    const filePath = path.join(
      process.cwd(),
      this.appConfigService.fileFolder,
      originalname,
    );

    try {
      await fsPromises.mkdir(path.dirname(filePath), { recursive: true });

      await fsPromises.writeFile(filePath, buffer);
    } catch (error) {
      throw new Error(`Error on file save: ${error}`);
    }
  }

  /**
   * Used to read files from local file system
   */
  async readLocally(filename: string): Promise<StreamableFile> {
    const filePath = path.join(
      process.cwd(),
      this.appConfigService.fileFolder,
      `${filename}.jpeg`,
    );

    try {
      const file = fs.createReadStream(filePath);

      return new StreamableFile(file, { type: 'image/jpeg' });
    } catch (error) {
      throw new Error(`Error on file read: ${error}`);
    }
  }

  async uploadAvatarForUser(file: Express.Multer.File, username: string) {
    const session = await this.connection.startSession();

    try {
      session.startTransaction();

      const user = await this.userService.findByUsername(username);

      if (!user) throw new Error(`user: ${username} not found`);

      if (user.avatar === file.originalname) {
        await session.commitTransaction();

        return user;
      }

      const avatar = await this.saveInDb(file);

      if (!avatar) throw new Error(`failed to upload: ${file.originalname}`);

      const updatedUser = await this.userService.updateUserAvatar(
        username,
        avatar.originalname,
      );

      await session.commitTransaction();

      return updatedUser;
    } catch {
      await session.abortTransaction();

      throw new Error('Error on avatar update');
    } finally {
      session.endSession();
    }
  }

  /**
   * Used to save files in cloud mongodb
   */
  async saveInDb(file: Express.Multer.File): Promise<{
    filename: ObjectId;
    originalname: string;
  }> {
    const { originalname } = file;

    const existingFiles =
      await this.filesImagesBucketRepository.findAllByName(originalname);

    if (existingFiles.length) {
      const [existingFile] = existingFiles;

      return {
        filename: existingFile._id,
        originalname: existingFile.filename,
      };
    }

    return this.filesImagesBucketRepository.uploadFile(file);
  }

  /**
   * Used to read files from cloud mongodb
   */
  async readFromDb(filename: string): Promise<GridFSBucketReadStream> {
    try {
      return this.filesImagesBucketRepository.GetStreamByName(filename);
    } catch (error) {
      throw new Error(`Error on file read: ${error}`);
    }
  }
}
