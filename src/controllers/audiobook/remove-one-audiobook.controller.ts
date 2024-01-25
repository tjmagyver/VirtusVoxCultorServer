import { Controller, Delete, Param } from "@nestjs/common";
import { AudiobookService } from '../../audiobook/audiobook.service';
import { Public } from '../../auth/public';

@Controller('/audiobooks')
@Public()
export class RemoveOneAudiobookController {
  constructor(private audiobook: AudiobookService) { }

  @Delete(':id')
  async handle(@Param('id') id: string) {
    return this.audiobook.remove(id)
  }
}