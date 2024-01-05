import { AudiobookService } from '@/audiobook/audiobook.service';
import { Controller, Get, Param } from "@nestjs/common";

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
export class FindOneAudiobookController {
  constructor(private audiobook: AudiobookService) { }

  @Get(':id')
  async handle(@Param('id') id: string): Promise<AudiobookData> {
    return this.audiobook.findOne(id)
  }
}