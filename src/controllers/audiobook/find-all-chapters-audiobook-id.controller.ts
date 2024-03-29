import { Controller, Get, Param } from "@nestjs/common";
import { AudiobookService } from '../../audiobook/audiobook.service';
import { Public } from '../../auth/public';

@Controller('/audiobooks/audiobookId')
@Public()
export class FindAllChaptersAudiobookIdController {
  constructor(private audiobook: AudiobookService) { }

  @Get(':audiobookId')
  async handle(@Param('audiobookId') audiobookId: string): Promise<any> {
    const chapters = await this.audiobook.findAllChaptersToAudiobookId(audiobookId)
    return chapters
  }
}