import { Controller, Get, Param } from "@nestjs/common";
import { Public } from "../../auth/public";
import { ChapterService } from "../../chapter/chapter.service";

@Controller('/chapters')
@Public()
export class DownloadChapterController {
  constructor(private chapter: ChapterService) { }

  @Get('download/:fileName')
  async handle(@Param('fileName') fileName: string): Promise<Buffer> {
    return this.chapter.download(fileName)
  }
}