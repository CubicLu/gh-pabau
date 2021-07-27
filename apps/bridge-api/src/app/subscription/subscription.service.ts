import { Context } from '../../context'
import {
  SubscriptionCardDetailsOutput,
  SubscriptionDetailsOutput,
  SubscriptionQueryInputs,
} from './dto/subscription.dto'
import { SubscriptionInvoice } from './nexus-type'

export abstract class SubscriptionService {
  type: 'GoCardless' | 'Stripe'
  public constructor(protected ctx: Context, protected client_id: string) {}

  abstract build(): Promise<void>

  abstract listSubscriptions(
    input: SubscriptionQueryInputs
  ): Promise<typeof SubscriptionInvoice[]>

  abstract countSubscriptions(input: SubscriptionQueryInputs): Promise<number>

  abstract getDetails(): Promise<SubscriptionDetailsOutput>

  abstract getCardDetails(): Promise<SubscriptionCardDetailsOutput>

  public static async getType(
    ctx: Context
  ): Promise<{ [key: string]: string }> {
    const subscription = await ctx.prisma.companySubscription.findFirst({
      where: {
        company_id: ctx.authenticated?.company,
      },
      select: {
        gc_customer_id: true,
        stripe_customer_id: true,
      },
    })
    const response: { [key: string]: string } = {
      id: subscription.gc_customer_id ?? subscription.stripe_customer_id,
      type: subscription.gc_customer_id
        ? 'SubscriptionGoCardless'
        : 'SubscriptionStripe',
    }

    return response
  }
}
