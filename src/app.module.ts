import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeaseModule } from './lease/lease.module';
import { FileUploadController } from './file-upload/file-upload.controller';

@Module({
  imports: [LeaseModule],
  controllers: [AppController, FileUploadController],
  providers: [AppService],
})
export class AppModule {}
