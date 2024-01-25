import { Body, ConflictException, Controller, Param, Patch } from "@nestjs/common";
import { compare, hash } from 'bcrypt';
import { z } from 'zod';
import { Public } from '../../auth/public';
import { PrismaService } from '../../prisma/prisma.service';

const updatePasswordAccountBodySchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string()
})

type UpdatePasswordAccountBodySchema = z.infer<typeof updatePasswordAccountBodySchema>

@Controller('/accounts')
@Public()
export class UpdatePasswordAccountController {
  constructor(private prisma: PrismaService) { }

  @Patch('change-password/:id')
  // @UsePipes(new ZodValidationPipe(updatePasswordAccountBodySchema))
  async handle(@Param('id') id: string, @Body() body: UpdatePasswordAccountBodySchema) {
    const { oldPassword, newPassword } = body

    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new ConflictException('User does not exist')
    }

    const isPasswordValid = await compare(oldPassword, user.password!);
    if (!isPasswordValid) {
      throw new ConflictException('Senha atual incorreta!');
    }

    const hashedPassword = await hash(newPassword, 8)

    const userUpdate = await this.prisma.user.update({
      where: {
        id
      },
      data: {
        password: hashedPassword
      }
    })

    return {
      ...userUpdate,
      password: undefined
    }
  }
}