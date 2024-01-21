import { Public } from "@/auth/public";
import { ChapterService } from "@/chapter/chapter.service";
import { Body, Controller, Param, Put, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { z } from 'zod';

const updateChapterBodySchema = z.object({
  audiobookId: z.string(),
  duration: z.number(),
  file: z.string().url(),
  title: z.string(),
})

export type UpdateChapterBodySchema = z.infer<typeof updateChapterBodySchema>

@Controller('/chapters')
@Public()
export class UpdateChapterController {
  constructor(private chapter: ChapterService) { }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(updateChapterBodySchema))
  async handle(@Param('id') id: string, @Body() body: UpdateChapterBodySchema) {
    return this.chapter.update(id, body)
  }
}