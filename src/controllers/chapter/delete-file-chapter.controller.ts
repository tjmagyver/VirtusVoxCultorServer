import { Controller, Delete, Param } from "@nestjs/common";
import { Public } from "../../auth/public";
import { ChapterService } from "../../chapter/chapter.service";

@Controller('/chapters')
@Public()
export class DeleteFileChapterController {
  constructor(private chapter: ChapterService) { }

  @Delete('delete/:fileName')
  async handle(@Param('fileName') fileName: string): Promise<Buffer> {
    return this.chapter.delete(fileName)
  }
}