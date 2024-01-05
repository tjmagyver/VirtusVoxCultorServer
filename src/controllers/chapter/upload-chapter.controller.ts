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
        new FileTypeValidator({ fileType: '.(wav|mp3)' }),
      ],
    }),
  ) file: Express.Multer.File) {
    // const audioUrl = await this.chapter.uploadAudio(file);

    // return { url: audioUrl };
    console.log(file)

    const { originalname, mimetype, buffer } = file

    const url = this.chapter.upload({
      fileName: originalname,
      fileType: mimetype,
      body: buffer
    })

    return url
  }
}