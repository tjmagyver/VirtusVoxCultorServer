import { Module } from "@nestjs/common";
import Stripe from "stripe";
import { CreateCheckoutSessionController } from "./../controllers/checkout/create-checkout.controller";
import { DeleteCheckoutSessionController } from "./../controllers/checkout/delete-checkout.controller";
import { FindOneCheckoutSessionController } from "./../controllers/checkout/find-one-checkout.controller";
import { PrismaService } from "./../prisma/prisma.service";
import { StripeService } from "./../stripe";

@Module({
  controllers: [
    CreateCheckoutSessionController,
    FindOneCheckoutSessionController,
    DeleteCheckoutSessionController,
  ],
  providers: [StripeService, Stripe, PrismaService,],
  imports: []
})

export class CheckoutModule { }