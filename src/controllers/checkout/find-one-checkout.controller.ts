import { Controller, Get } from "@nestjs/common";
import { CurrentUser } from "../../auth/current-user-decorator";
import { Public } from "../../auth/public";
import { StripeService } from "../../stripe";

@Controller('/checkout-session/find-one')
@Public()
export class FindOneCheckoutSessionController {
  constructor(
    private stripe: StripeService
  ) { }

  @Get()
  async handle(@CurrentUser() user: any) {
    const subscription = await this.stripe.findOneCheckoutSession(user?.id);
    return subscription
  }
}