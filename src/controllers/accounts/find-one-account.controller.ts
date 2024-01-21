import { Public } from '@/auth/public';
import { PrismaService } from '@/prisma/prisma.service';
import { ConflictException, Controller, Get, Param } from "@nestjs/common";

@Controller('/accounts')
@Public()
export class FindOneAccountController {
  constructor(private prisma: PrismaService) { }

  @Get(':id')
  async handle(@Param('id') id: string): Promise<any> {
    const account = await this.prisma.user.findFirst({
      where: {
        id
      }
    })

    if (!account) {
      throw new ConflictException('Account with this id does not exist')
    }

    return {
      ...account,
      password: undefined
    }
  }
}