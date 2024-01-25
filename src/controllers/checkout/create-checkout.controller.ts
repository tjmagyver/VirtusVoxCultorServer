import { Body, Controller, Post } from "@nestjs/common";
import { z } from "zod";
import { Public } from "../../auth/public";
import { PrismaService } from "../../prisma/prisma.service";
import { StripeService } from "../../stripe";

const schemaCheckoutSession = z.object({
  productId: z.string(),
  quantity: z.number(),
  planId: z.string(),
  email: z.string().email(),
})

type CheckoutSessionData = z.infer<typeof schemaCheckoutSession>

@Controller('/checkout-session')
@Public()
export class CreateCheckoutSessionController {
  constructor(
    private stripe: StripeService,
    private prisma: PrismaService
  ) { }

  @Post()
  async handle(@Body() { productId, quantity, planId, email }: CheckoutSessionData) {
    const session = await this.stripe.createCheckoutSession(productId, quantity, planId, email);

    const userWithEmail = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    })

    await this.prisma.user.update({
      where: {
        email: userWithEmail?.email,
      },
      data: {
        isSigned: true,
      }
    })
    return session;
  }
}