import { Public } from "@/auth/public";
import { ChapterService } from "@/chapter/chapter.service";
import { Controller, Get, Param } from "@nestjs/common";
import { AudiobookData } from './../audiobook/find-all-audiobooks.controller';

export type ChapterData = {
  id: string,
  title: string,
  duration: number,
  file: string,
  audiobookId: string,
  audiobook: AudiobookData,
  createdAt: Date,
  updatedAt: Date
}

@Controller('/chapters')
@Public()
export class FindOneChapterController {
  constructor(private chapter: ChapterService) { }

  @Get(':id')
  async handle(@Param('id') id: string): Promise<ChapterData> {
    return this.chapter.findOne(id)
  }
}