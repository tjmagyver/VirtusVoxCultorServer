import { Body, Controller, Param, Put, UsePipes } from "@nestjs/common";
import { z } from 'zod';
import { ZodValidationPipe } from "../../../src/pipes/zod-validation-pipe";
import { AudiobookService } from "../../audiobook/audiobook.service";
import { Public } from "../../auth/public";

const updateAudiobookBodySchema = z.object({
  cover: z.string().url(),
  duration: z.number(),
  publisher: z.string(),
  sinopse: z.string(),
  linkPurchase: z.string().url(),
  title: z.string(),
})

export type UpdateAudiobookBodySchema = z.infer<typeof updateAudiobookBodySchema>

@Controller('/audiobooks')
@Public()
export class UpdateAudiobookController {
  constructor(private audiobook: AudiobookService) { }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(updateAudiobookBodySchema))
  async handle(@Param(':id') id: string, @Body() body: UpdateAudiobookBodySchema) {
    return this.audiobook.update(id, body)
  }
}