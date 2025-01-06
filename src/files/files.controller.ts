import {
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import type { Response } from 'express';
import { PARAMETERS, ROUTS } from 'src/constants/routs';

@Controller(ROUTS.FILES.BASE)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100_000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.filesService.save(file);
  }

  @Get(`:${PARAMETERS.FILE_NAME}`)
  async readFile(
    @Param(PARAMETERS.FILE_NAME) filename: string,
    @Res() res: Response,
  ) {
    const fileStream = await this.filesService.read(filename);

    res.setHeader('Content-Type', 'image/jpeg');

    fileStream.pipe(res);
  }

  @Post(`${ROUTS.FILES.POST_USER_AVATAR}/:${PARAMETERS.USER_NAME}`)
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100_000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param(PARAMETERS.USER_NAME) username: string,
  ) {
    return this.filesService.updateUserAvatar(file, username);
  }
}
