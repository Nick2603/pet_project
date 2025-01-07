import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import {
  GridFSBucket,
  type GridFSBucketReadStream,
  type GridFSFile,
  type ObjectId,
} from 'mongodb';
import type { Connection } from 'mongoose';

@Injectable()
export class FilesImagesBucketRepository {
  private readonly bucket: GridFSBucket;

  constructor(@InjectConnection() private connection: Connection) {
    this.bucket = new GridFSBucket(connection.db!, { bucketName: 'images' });
  }

  async findAllByName(name: string): Promise<GridFSFile[]> {
    return this.bucket.find({ filename: name }).toArray();
  }

  async GetStreamByName(name: string): Promise<GridFSBucketReadStream> {
    return this.bucket.openDownloadStreamByName(`${name}.jpeg`);
  }

  async uploadFile({ originalname, buffer }: Express.Multer.File): Promise<{
    filename: ObjectId;
    originalname: string;
  }> {
    return new Promise((resolve, reject) => {
      try {
        const uploadStream = this.bucket.openUploadStream(originalname);

        uploadStream.end(buffer, () => {
          resolve({
            filename: uploadStream.id,
            originalname: originalname,
          });
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
