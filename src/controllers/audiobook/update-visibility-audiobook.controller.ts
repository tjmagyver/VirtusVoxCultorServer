import { AudiobookService } from "@/audiobook/audiobook.service";
import { Public } from "@/auth/public";
import { Body, Controller, Param, Patch } from "@nestjs/common";
import { z } from 'zod';

const updateVisibilityAudiobookBodySchema = z.object({
  isVisible: z.boolean(),
})

export type UpdateVisibilityAudiobookBodySchema = z.infer<typeof updateVisibilityAudiobookBodySchema>

@Controller('/audiobooks')
@Public()
export class UpdateVisibilityAudiobookController {
  constructor(private audiobook: AudiobookService) { }

  @Patch(':id')
  // @UsePipes(new ZodValidationPipe(updateVisibilityAudiobookBodySchema))
  async handle(@Param('id') id: string, @Body() body: UpdateVisibilityAudiobookBodySchema) {
    return this.audiobook.updateVisibility(id, body)
  }
}