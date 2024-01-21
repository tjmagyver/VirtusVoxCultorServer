import { CreateAudiobookBodySchema } from '@/controllers/audiobook/create-audiobook.controller';
import { UpdateAudiobookBodySchema } from '@/controllers/audiobook/update-audiobook.controller';
import { UpdateVisibilityAudiobookBodySchema } from '@/controllers/audiobook/update-visibility-audiobook.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { Body, ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class AudiobookService {
  constructor(private prisma: PrismaService) { }

  async create(body: CreateAudiobookBodySchema) {
    const { cover, duration, publisher, linkPurchase, sinopse, title, numberOfChapters, isPrivate } = body

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
        linkPurchase,
        sinopse,
        title,
        numberOfChapters,
        isPrivate
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

  async findAllChaptersToAudiobookId(audiobookId: string): Promise<any> {
    const chapters = await this.prisma.chapter.findMany({
      where: {
        audiobookId: audiobookId
      },
    })

    if (!chapters) {
      throw new ConflictException('Audiobook with this id does not exist')
    }

    return chapters
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
    const { cover, duration, publisher, linkPurchase, sinopse, title } = body

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
        linkPurchase,
        sinopse,
        title
      }
    });
  }

  async updateVisibility(id: string, @Body() body: UpdateVisibilityAudiobookBodySchema) {
    const { isVisible } = body

    const audiobook = await this.prisma.audiobook.findFirst({
      where: {
        id
      }
    })

    if (!audiobook) {
      throw new ConflictException('Audiobook with this id does not exist')
    }

    const audiobookUpdated = await this.prisma.audiobook.update({
      where: {
        id
      },
      data: {
        isVisible,
      }
    });

    return audiobookUpdated
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