import { ChapterService } from "@/chapter/chapter.service";
import { Controller, Delete, Param } from "@nestjs/common";

@Controller('/chapters')
export class RemoveOneChapterController {
  constructor(private chapter: ChapterService) { }

  @Delete(':id')
  async handle(@Param('id') id: string) {
    return this.chapter.remove(id)
  }
}