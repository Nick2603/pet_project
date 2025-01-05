import { Injectable, StreamableFile } from '@nestjs/common';
import * as path from 'node:path';
import * as fsPromises from 'node:fs/promises';
import * as fs from 'node:fs';
import { AppConfigService } from 'src/config/app-config.service';
import { GridFSBucket, GridFSBucketReadStream, ObjectId } from 'mongodb';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FilesRepository {
  private readonly bucket: GridFSBucket;

  constructor(
    @InjectConnection() private connection: Connection,
    private readonly appConfigService: AppConfigService,
    private readonly userService: UsersService,
  ) {
    this.bucket = new GridFSBucket(connection.db!, { bucketName: 'images' });
  }
  /**
   * Used to save files in local file system
   */
  async saveLocally(file: Express.Multer.File): Promise<void> {
    const filePath = path.join(
      process.cwd(),
      this.appConfigService.fileFolder,
      file.originalname,
    );

    try {
      await fsPromises.mkdir(path.dirname(filePath), { recursive: true });

      await fsPromises.writeFile(filePath, file.buffer);
    } catch (error) {
      throw new Error(`Error on file save: ${error}`);
    }
  }

  /**
   * Used to read files from local file system
   */
  readLocally = async (filename: string): Promise<StreamableFile> => {
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
  };

  async uploadAvatarForUser(file: Express.Multer.File, username: string) {
    const session = await this.connection.startSession();

    try {
      session.startTransaction();

      const avatar = await this.saveInDb(file);

      if (!avatar) throw new Error(`failed to upload: ${file.originalname}`);

      const updatedUser = this.userService.updateUserAvatar(
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
  } | void> {
    const { originalname, buffer } = file;

    const existingFiles = await this.bucket
      .find({ filename: originalname })
      .toArray();

    if (existingFiles.length > 0) return;

    return new Promise((resolve, reject) => {
      try {
        const uploadStream = this.bucket.openUploadStream(originalname);

        uploadStream.end(buffer, () => {
          resolve({
            filename: uploadStream.id,
            originalname: file.originalname,
          });
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Used to read files from cloud mongodb
   */
  async readFromDb(filename: string): Promise<GridFSBucketReadStream> {
    try {
      return this.bucket.openDownloadStreamByName(`${filename}.jpeg`);
    } catch (error) {
      throw new Error(`Error on file read: ${error}`);
    }
  }
}
