import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { z } from 'zod';
import { ZodValidationPipe } from "../../../src/pipes/zod-validation-pipe";
import { AudiobookService } from "../../audiobook/audiobook.service";
import { Public } from "../../auth/public";

const createAudiobookBodySchema = z.object({
  cover: z.string(),
  duration: z.number(),
  publisher: z.string(),
  linkPurchase: z.string().url(),
  sinopse: z.string(),
  title: z.string(),
  isPrivate: z.boolean(),
  numberOfChapters: z.number()
})

export type CreateAudiobookBodySchema = z.infer<typeof createAudiobookBodySchema>

@Controller('/audiobooks')
@Public()
export class CreateAudiobookController {
  constructor(private audiobook: AudiobookService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(createAudiobookBodySchema))
  async handle(@Body() body: CreateAudiobookBodySchema) {
    return this.audiobook.create(body)
  }
}