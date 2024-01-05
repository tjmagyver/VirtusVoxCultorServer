import { CreateAudiobookBodySchema } from '@/controllers/audiobook/create-audiobook.controller';
import { UpdateAudiobookBodySchema } from '@/controllers/audiobook/update-audiobook.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { Body, ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class AudiobookService {
  constructor(private prisma: PrismaService) { }

  async create(body: CreateAudiobookBodySchema) {
    const { cover, duration, publisher, sinopse, title } = body

    const audiobookWithSameTitle = await this.prisma.audiobook.findUnique({
      where: {
        title
      }
    })

    if (audiobookWithSameTitle) {
      throw new ConflictException('Audiobook with same title already exists')
    }

    const audiobook = await this.prisma.audiobook.create({
      data: {
        cover,
        duration,
        publisher,
        sinopse,
        title
      }
    })

    return audiobook
  }

  async findAll() {
    return await this.prisma.audiobook.findMany({
      include: {
        chapters: true
      }
    });
  }

  async findOne(id: string) {
    const audiobook = await this.prisma.audiobook.findFirst({
      where: {
        id
      },
      include: {
        chapters: true
      }
    })

    if (!audiobook) {
      throw new ConflictException('Audiobook with this id does not exist')
    }

    return audiobook
  }

  async update(id: string, @Body() body: UpdateAudiobookBodySchema) {
    const { cover, duration, publisher, sinopse, title } = body

    const audiobookWithSameTitle = await this.prisma.audiobook.findUnique({
      where: {
        title
      }
    })

    if (!audiobookWithSameTitle) {
      throw new ConflictException('Audiobook with same title not exists')
    }

    await this.prisma.audiobook.update({
      where: {
        id
      },
      data: {
        cover,
        duration,
        publisher,
        sinopse,
        title
      }
    });
  }

  async remove(id: string) {
    const audiobook = await this.prisma.audiobook.findFirst({
      where: {
        id
      }
    })

    if (!audiobook) {
      throw new ConflictException('Audiobook with this id does not exist')
    }

    await this.prisma.audiobook.delete({
      where: {
        id
      }
    });
  }
}