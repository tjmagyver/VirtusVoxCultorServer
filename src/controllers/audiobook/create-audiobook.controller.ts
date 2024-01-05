import { AudiobookService } from "@/audiobook/audiobook.service";
import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { z } from 'zod';

const createAudiobookBodySchema = z.object({
  cover: z.string().url(),
  duration: z.number(),
  publisher: z.string(),
  sinopse: z.string(),
  title: z.string(),
})

export type CreateAudiobookBodySchema = z.infer<typeof createAudiobookBodySchema>

@Controller('/audiobooks')
export class CreateAudiobookController {
  constructor(private audiobook: AudiobookService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(createAudiobookBodySchema))
  async handle(@Body() body: CreateAudiobookBodySchema) {
    return this.audiobook.create(body)
  }
}