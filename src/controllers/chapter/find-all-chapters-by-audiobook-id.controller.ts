import { AudiobookService } from '@/audiobook/audiobook.service';
import { Public } from '@/auth/public';
import { Controller, Get, Param } from "@nestjs/common";
import { ChapterData } from './find-one-chapter.controller';

@Controller('/chapters')
@Public()
export class FindAllChapertsByAudiobookIdController {
  constructor(private audiobook: AudiobookService) { }

  @Get('audiobooks/:audiobookId')
  async handle(@Param('audiobookId') audiobookId: string): Promise<ChapterData[]> {
    const chapters = await this.audiobook.findAllChaptersToAudiobookId(audiobookId)
    return chapters
  }
}