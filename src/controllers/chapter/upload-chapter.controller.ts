import { Public } from "@/auth/public";
import { ChapterService } from "@/chapter/chapter.service";
import { Controller, FileTypeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('/chapters')
@Public()
export class UploadChapterController {
  constructor(private chapter: ChapterService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async handle(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: '.(wav|mp3|jpeg|png|jpg)' }),
      ],
    }),
  ) file: Express.Multer.File) {
    const { originalname, mimetype, buffer } = file

    const url = this.chapter.upload({
      fileName: originalname,
      fileType: mimetype,
      body: buffer
    })

    return url
  }
}