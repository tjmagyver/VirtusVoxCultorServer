import { ChapterService } from "@/chapter/chapter.service";
import { Controller, Get } from "@nestjs/common";
import { ChapterData } from "./find-one-chapter.controller";

@Controller('/chapters')
export class FindAllChaptersController {
  constructor(private chapter: ChapterService) { }

  @Get()
  async handle(): Promise<ChapterData[]> {
    return this.chapter.findAll()
  }
}