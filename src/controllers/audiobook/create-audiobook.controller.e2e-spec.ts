import { AppModule } from "@/app.module";
import { PrismaService } from "@/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Create audiobook (E2E)', () => {
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

  test('[POST] /audiobooks', async () => {
    const response = await request(app.getHttpServer()).post('/audiobooks').send({
      cover: 'https://aws.bucket.com',
      duration: 3600,
      publisher: 'Dialética',
      sinopse: 'Livro inspirado na obra de ...',
      title: 'Os Miseráveis'
    })

    expect(response.statusCode).toBe(201)

    const userOndatabase = await prisma.audiobook.findUnique({
      where: {
        title: 'Os Miseráveis'
      }
    })

    expect(userOndatabase).toBeTruthy()
  })
})