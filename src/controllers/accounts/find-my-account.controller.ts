import { CurrentUser } from '@/auth/current-user-decorator';
import { Controller, Get } from "@nestjs/common";

@Controller('/me')
// @Public()
export class FindMyAccountController {
  @Get()
  getMe(@CurrentUser() user: any) {
    return user
  }
}