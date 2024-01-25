import { Controller, Get } from "@nestjs/common";
import { CurrentUser } from '../../auth/current-user-decorator';

@Controller('/me')
// @Public()
export class FindMyAccountController {
  @Get()
  getMe(@CurrentUser() user: any) {
    return user
  }
}