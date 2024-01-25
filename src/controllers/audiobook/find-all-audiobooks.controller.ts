import { Controller, Get } from "@nestjs/common";
import { AudiobookService } from '../../audiobook/audiobook.service';
import { Public } from '../../auth/public';

export type AudiobookData = {
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
export class FindAllAudiobooksController {
  constructor(private audiobook: AudiobookService) { }

  @Get()
  async handle(): Promise<AudiobookData[]> {
    return this.audiobook.findAll()
  }
}