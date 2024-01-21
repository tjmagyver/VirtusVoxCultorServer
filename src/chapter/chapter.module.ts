import { AudiobookService } from '@/audiobook/audiobook.service';
import { CreateChapterController } from '@/controllers/chapter/create-chapter.controller';
import { DeleteFileChapterController } from '@/controllers/chapter/delete-file-chapter.controller';
import { DownloadChapterController } from '@/controllers/chapter/download-chapter.controller';
import { FindAllChapertsByAudiobookIdController } from '@/controllers/chapter/find-all-chapters-by-audiobook-id.controller';
import { FindAllChaptersController } from '@/controllers/chapter/find-all-chapters.controller';
import { UploadChapterController } from '@/controllers/chapter/upload-chapter.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { S3Client } from '@aws-sdk/client-s3';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FindOneChapterController } from './../controllers/chapter/find-one-chapter.controller';
import { RemoveOneChapterController } from './../controllers/chapter/remove-one-chapter.controller';
import { UpdateChapterController } from './../controllers/chapter/update-chapter.controller';
import { ChapterService } from './chapter.service';

@Module({
  controllers: [
    CreateChapterController,
    FindAllChaptersController,
    FindOneChapterController,
    RemoveOneChapterController,
    UpdateChapterController,
    UploadChapterController,
    DownloadChapterController,
    DeleteFileChapterController,
    FindAllChapertsByAudiobookIdController,
  ],
  providers: [ChapterService, AudiobookService, PrismaService, S3Client, ConfigService],
})
export class ChapterModule { }