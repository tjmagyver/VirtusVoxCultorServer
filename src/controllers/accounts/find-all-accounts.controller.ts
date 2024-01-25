import { ConflictException, Controller, Get } from "@nestjs/common";
import { Public } from '../../auth/public';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('/accounts')
@Public()
export class FindAllAccountController {
  constructor(private prisma: PrismaService) { }

  @Get()
  async handle(): Promise<any[]> {
    const accounts = await this.prisma.user.findMany()

    if (!accounts) {
      throw new ConflictException('Accounts does not exist')
    }

    const accountsWhitoutPassword = accounts.map(account => {
      return {
        ...account,
        password: undefined
      }
    })

    return accountsWhitoutPassword
  }
}