import { extendType } from 'nexus'
import { SubscriptionQueryInputs } from '../../app/subscription/dto/subscription.dto'
import {
  SubscriptionCountInputTypes,
  SubscriptionInputTypes,
  SubscriptionCardDetails,
  SubscriptionDetails,
  SubscriptionInvoice,
} from '../../app/subscription/nexus-type'
import { SubscriptionService } from '../../app/subscription/subscription.service'
import SubscriptionGoCardless from '../../app/subscription/subscription-gocardless.service'
import SubscriptionStripe from '../../app/subscription/subscription-stripe.service'
import { Context } from '../../context'

//This is used for dinamic instancing service classes
const classMap = {
  SubscriptionStripe: SubscriptionStripe,
  SubscriptionGoCardless: SubscriptionGoCardless,
}

export const Subscription = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('subscriptionInvoices', {
      type: SubscriptionInvoice,
      description: 'Pabau Subscription Invoices [Stripe | GoCardless]',
      args: SubscriptionInputTypes,
      async resolve(_root, input: SubscriptionQueryInputs, ctx: Context) {
        const subscription = await SubscriptionService.getType(ctx)
        const service = new classMap[subscription.type](ctx, subscription.id)
        await service.build()
        return await service.listSubscriptions(input)
      },
    })
    t.field('subscriptionInvoicesTotal', {
      type: 'Int',
      args: SubscriptionCountInputTypes,
      async resolve(_root, input: SubscriptionQueryInputs, ctx: Context) {
        const subscription = await SubscriptionService.getType(ctx)
        const service = new classMap[subscription.type](ctx, subscription.id)
        await service.build()
        return service.countSubscriptions(input)
      },
    })
    t.field('subscriptionDetails', {
      type: SubscriptionDetails,
      async resolve(_root, input, ctx: Context) {
        const subscription = await SubscriptionService.getType(ctx)
        const service = new classMap[subscription.type](ctx, subscription.id)
        await service.build()
        return service.getDetails()
      },
    })
    t.field('subscriptionCardDetails', {
      type: SubscriptionCardDetails,
      async resolve(_root, input, ctx: Context) {
        const subscription = await SubscriptionService.getType(ctx)
        const service = new classMap[subscription.type](ctx, subscription.id)
        await service.build()
        return service.getCardDetails()
      },
    })
  },
})
