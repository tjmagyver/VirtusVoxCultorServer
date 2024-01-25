import { Controller, Delete, Param } from "@nestjs/common";
import { z } from "zod";
import { CurrentUser } from "../../auth/current-user-decorator";
import { Public } from "../../auth/public";
import { StripeService } from "../../stripe";

const schemaDeleteCheckoutSession = z.object({
  subscriptionId: z.string(),
})

type DeleteCheckoutSessionData = z.infer<typeof schemaDeleteCheckoutSession>

@Controller('/delete-checkout-session')
@Public()
export class DeleteCheckoutSessionController {
  constructor(
    private stripe: StripeService
  ) { }

  @Delete(':subscriptionId')
  async handle(@Param('subscriptionId') subscriptionId: string, @CurrentUser() user: any) {
    await this.stripe.deleteCheckoutSession(user?.id, subscriptionId);
  }
}