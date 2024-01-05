import { ChapterService } from "@/chapter/chapter.service";
import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { z } from 'zod';

const createChapterBodySchema = z.object({
  audiobookId: z.string(),
  duration: z.number(),
  file: z.string().url(),
  title: z.string(),
})

export type CreateChapterBodySchema = z.infer<typeof createChapterBodySchema>

@Controller('/chapters')
export class CreateChapterController {
  constructor(private chapter: ChapterService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(createChapterBodySchema))
  async handle(@Body() body: CreateChapterBodySchema) {
    return this.chapter.create(body)
  }
}