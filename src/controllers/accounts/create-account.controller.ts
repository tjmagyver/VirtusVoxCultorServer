import { Body, ConflictException, Controller, Post, UsePipes } from "@nestjs/common";
import { hash } from 'bcrypt';
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { z } from 'zod';
import { Public } from '../../auth/public';
import { PrismaService } from '../../prisma/prisma.service';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
  password: z.string()
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private prisma: PrismaService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    try {
      const { name, email, username, password } = body
      console.log(name)

      const userWithSameEmail = await this.prisma.user.findUnique({
        where: {
          email
        }
      })

      if (userWithSameEmail) {
        throw new ConflictException('User with same e-mail address already exists')
      }

      const hashedPassword = await hash(password, 8)

      await this.prisma.user.create({
        data: {
          name,
          email,
          username,
          password: hashedPassword
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}