import { Injectable, StreamableFile } from '@nestjs/common';
import * as path from 'node:path';
import * as fsPromises from 'node:fs/promises';
import * as fs from 'node:fs';
import { AppConfigService } from 'src/config/app-config.service';

@Injectable()
export class FilesRepository {
  constructor(private readonly appConfigService: AppConfigService) {}

  async save(file: Express.Multer.File): Promise<void> {
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

  readFileStream = async (filename: string): Promise<StreamableFile> => {
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
}
