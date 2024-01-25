import { S3Client } from '@aws-sdk/client-s3';
import { Module } from '@nestjs/common';
import { ChapterService } from './../chapter/chapter.service';
import { CreateAudiobookController } from './../controllers/audiobook/create-audiobook.controller';
import { FindAllAudiobooksController } from './../controllers/audiobook/find-all-audiobooks.controller';
import { FindAllChaptersAudiobookIdController } from './../controllers/audiobook/find-all-chapters-audiobook-id.controller';
import { FindOneAudiobookController } from './../controllers/audiobook/find-one-audiobook.controller';
import { RemoveOneAudiobookController } from './../controllers/audiobook/remove-one-audiobook.controller';
import { UpdateAudiobookController } from './../controllers/audiobook/update-audiobook.controller';
import { UpdateVisibilityAudiobookController } from './../controllers/audiobook/update-visibility-audiobook.controller';
import { PrismaService } from './../prisma/prisma.service';
import { AudiobookService } from './audiobook.service';

@Module({
  controllers: [
    CreateAudiobookController,
    FindAllAudiobooksController,
    UpdateAudiobookController,
    FindOneAudiobookController,
    RemoveOneAudiobookController,
    UpdateVisibilityAudiobookController,
    FindAllChaptersAudiobookIdController,
  ],
  providers: [AudiobookService, PrismaService, ChapterService, S3Client],
})
export class AudiobookModule { }