import { CreateAudiobookController } from '@/controllers/audiobook/create-audiobook.controller';
import { FindAllAudiobooksController } from '@/controllers/audiobook/find-all-audiobooks.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { FindOneAudiobookController } from './../controllers/audiobook/find-one-audiobook.controller';
import { RemoveOneAudiobookController } from './../controllers/audiobook/remove-one-audiobook.controller';
import { UpdateAudiobookController } from './../controllers/audiobook/update-audiobook.controller';
import { AudiobookService } from './audiobook.service';

@Module({
  controllers: [
    CreateAudiobookController,
    FindAllAudiobooksController,
    UpdateAudiobookController,
    FindOneAudiobookController,
    RemoveOneAudiobookController
  ],
  providers: [AudiobookService, PrismaService],
})
export class AudiobookModule { }