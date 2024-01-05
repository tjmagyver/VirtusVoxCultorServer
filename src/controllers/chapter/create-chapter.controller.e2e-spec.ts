import { AppModule } from "@/app.module";
import { PrismaService } from "@/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Create chapter (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService)
    await app.init();
  });

  test('[POST] /chapters', async () => {
    const response = await request(app.getHttpServer()).post('/chapters').send({
      audiobookId: 'id',
      duration: 3600,
      file: 'https://aws.bucket.com',
      title: 'Prefácio',
    })

    expect(response.statusCode).toBe(201)

    const userOndatabase = await prisma.chapter.findUnique({
      where: {
        title: 'Prefácio'
      }
    })

    expect(userOndatabase).toBeTruthy()
  })
})