import { Controller, Get } from "@nestjs/common";
import { Public } from "../../auth/public";
import { ChapterService } from "../../chapter/chapter.service";
import { ChapterData } from "./find-one-chapter.controller";

@Controller('/chapters')
@Public()
export class FindAllChaptersController {
  constructor(private chapter: ChapterService) { }

  @Get()
  async handle(): Promise<ChapterData[]> {
    return this.chapter.findAll()
  }
}