import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Body, ConflictException, Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';
import { CreateChapterBodySchema } from './../controllers/chapter/create-chapter.controller';
import { UpdateChapterBodySchema } from './../controllers/chapter/update-chapter.controller';
import { Env } from './../env';
import { PrismaService } from './../prisma/prisma.service';

export interface UploadChapter {
  fileName: string
  fileType: string
  body: Buffer
}

@Injectable()
export class ChapterService {
  constructor(
    private prisma: PrismaService,
    private client: S3Client,
    config: ConfigService<Env, true>
  ) {
    const AWS_BUCKET_NAME_ = config.get('AWS_BUCKET_NAME_', { infer: true })
    const AWS_ACCESS_KEY_ID_ = config.get('AWS_ACCESS_KEY_ID_', { infer: true })
    const AWS_SECRET_ACCESS_KEY_ = config.get('AWS_SECRET_ACCESS_KEY_', { infer: true })

    this.client = new S3Client({
      endpoint: AWS_BUCKET_NAME_,
      region: 'us-east-2',
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID_,
        secretAccessKey: AWS_SECRET_ACCESS_KEY_,
      }
    })
  }

  async create(@Body() body: CreateChapterBodySchema) {
    const { audiobookId, duration, file, title } = body

    const ChapterWithSameTitle = await this.prisma.chapter.findUnique({
      where: {
        title
      }
    })

    if (ChapterWithSameTitle) {
      throw new ConflictException('Chapter with same title already exists')
    }

    const chapter = await this.prisma.chapter.create({
      data: {
        audiobookId,
        duration,
        file,
        title
      }
    })

    return chapter
  }

  async findAll() {
    const chapters = await this.prisma.chapter.findMany({
      include: {
        audiobook: true
      }
    });

    return chapters
  }

  async findAllChaptersToAudiobookId(audiobookId: string) {
    const chapters = await this.prisma.chapter.findMany({
      where: {
        audiobookId
      },
      include: {
        audiobook: true
      }
    });

    const chaptersWithSameAudiobookId = chapters.filter(chapter => chapter.audiobookId === audiobookId)

    return chaptersWithSameAudiobookId
  }

  async findOne(id: string) {
    const chapter = await this.prisma.chapter.findFirst({
      where: {
        id
      },
      include: {
        audiobook: true
      }
    });

    if (!chapter) {
      throw new ConflictException('Chapter with this id does not exist')
    }

    return chapter
  }

  async update(id: string, body: UpdateChapterBodySchema) {
    const { audiobookId, duration, file, title } = body

    const chapterWithSameTitle = await this.prisma.chapter.findUnique({
      where: {
        title
      }
    })

    if (!chapterWithSameTitle) {
      throw new ConflictException('Chapter with same title not exists')
    }

    await this.prisma.chapter.update({
      where: {
        id
      },
      data: {
        audiobookId,
        duration,
        file,
        title
      }
    })
  }

  async remove(id: string) {
    const chapter = await this.prisma.chapter.findFirst({
      where: {
        id
      }
    });

    if (!chapter) {
      throw new ConflictException('Chapter with this id does not exist')
    }

    await this.prisma.chapter.delete({
      where: {
        id
      }
    });
  }

  async upload({
    fileName,
    fileType,
    body
  }: UploadChapter): Promise<{ url: string }> {
    const uploadId = randomUUID()

    const uniqueFileName = `${uploadId}-${fileName}`

    await this.client.send(
      new PutObjectCommand({
        Bucket: 'AWS_BUCKET_NAME_',
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body
      })
    )

    return {
      url: uniqueFileName
    }
  }

  async download(fileName: string): Promise<Buffer | any> {
    const file: any = new GetObjectCommand({
      Bucket: 'AWS_BUCKET_NAME_',
      Key: fileName
    });

    try {
      const response: any = await this.client.send(file);

      // const str = await response.Body.transformToString();
      // console.log(str);
      console.log(response.Body.transformToString())
      return response.Body
    } catch (err) {
      console.error(err);
    }
  }

  async delete(fileName: string): Promise<Buffer | any> {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: 'AWS_BUCKET_NAME_',
          Key: fileName
        })
      )
    } catch (err) {
      console.error(err);
    }
  }
}