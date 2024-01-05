import { AudiobookService } from '@/audiobook/audiobook.service';
import { Controller, Delete, Param } from "@nestjs/common";

@Controller('/audiobooks')
export class RemoveOneAudiobookController {
  constructor(private audiobook: AudiobookService) { }

  @Delete(':id')
  async handle(@Param('id') id: string) {
    return this.audiobook.remove(id)
  }
}