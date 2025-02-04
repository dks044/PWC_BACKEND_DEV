import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class FileUploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file')) // 'file'은 클라이언트가 전송하는 파일의 키
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { message: file.filename + '파일을 받았습니다.' };
  }
}
