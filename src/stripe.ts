import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import Stripe from "stripe";
import { Env } from "./env";
import { PrismaService } from "./prisma/prisma.service";

@Injectable()
export class StripeService {
  constructor(
    private stripe: Stripe,
    config: ConfigService<Env, true>,
    private prisma: PrismaService,
  ) {
    const stripeSecretKey = config.get('STRIPE_SECRET_KEY_', { infer: true })

    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    })
  }

  async createCheckoutSession(productId: string, quantity: number, planId: string, email: string) {
    const userWithEmail = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!userWithEmail) {
      throw new Error('User does not exist')
    }

    const customers = await this.stripe.customers.list({ email })
    let customer;

    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await this.stripe.customers.create({ email });
    }

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: productId,
          quantity: quantity,
        },
      ],
      mode: 'subscription',
      customer: customer.id,
      client_reference_id: userWithEmail.id,
      success_url: 'https://google.com',
      cancel_url: 'https://google.com'
    });

    try {
      await this.prisma.user.update({
        where: {
          email: userWithEmail?.email,
        },
        data: {
          isSigned: true
        }
      })
    } catch (error) {
      console.log(error)
      console.log('erro ao atualizar usuario')
    }

    return session;
  }

  async deleteCheckoutSession(id: string, subscriptionId: string) {
    console.log(subscriptionId)
    try {
      await this.stripe.subscriptions.cancel(subscriptionId)
      try {
        await this.prisma.user.update({
          where: {
            id: id,
          },
          data: {
            isSigned: false
          }
        })
      } catch (error) {
        console.log(error)
        console.log('erro ao atualizar usuario')
      }
    } catch (error) {
      console.log(error)
      console.log('erro ao deletar subscription')
    }
  }

  async findOneCheckoutSession(id: string) {
    const subscription = await this.stripe.subscriptions.list({ customer: id })
    return subscription
  }
}