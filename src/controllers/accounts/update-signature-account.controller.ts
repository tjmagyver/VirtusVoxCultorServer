import { Body, ConflictException, Controller, Param, Patch } from "@nestjs/common";
import { z } from 'zod';
import { Public } from '../../auth/public';
import { PrismaService } from '../../prisma/prisma.service';

const updateSignatureAccountBodySchema = z.object({
  isSigned: z.coerce.boolean()
})

type UpdateSignatureAccountBodySchema = z.infer<typeof updateSignatureAccountBodySchema>

@Controller('/accounts')
@Public()
export class UpdateSignatureAccountController {
  constructor(private prisma: PrismaService) { }

  @Patch(':id')
  // @UsePipes(new ZodValidationPipe(updateSignatureAccountBodySchema))
  async handle(@Param('id') id: string, @Body() body: UpdateSignatureAccountBodySchema) {
    const { isSigned } = body

    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new ConflictException('User does not exist')
    }

    const userUpdate = await this.prisma.user.update({
      where: {
        id
      },
      data: {
        isSigned
      }
    })

    return {
      ...userUpdate,
      password: undefined
    }
  }
}