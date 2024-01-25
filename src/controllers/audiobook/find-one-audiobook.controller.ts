import { Controller, Get, Param } from "@nestjs/common";
import { AudiobookService } from '../../audiobook/audiobook.service';
import { Public } from '../../auth/public';

type AudiobookData = {
  id: string,
  title: string,
  cover: string,
  duration: number,
  sinopse: string,
  publisher: string,
  createdAt: Date,
  updatedAt: Date
}

@Controller('/audiobooks')
@Public()
export class FindOneAudiobookController {
  constructor(private audiobook: AudiobookService) { }

  @Get(':id')
  async handle(@Param('id') id: string): Promise<AudiobookData> {
    return this.audiobook.findOne(id)
  }
}