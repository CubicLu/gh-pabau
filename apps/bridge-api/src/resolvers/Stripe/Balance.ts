import { extendType, objectType } from 'nexus'
import Stripe from 'stripe'
import { Context } from '../../context'

const StripeBalance = objectType({
  name: 'StripeBalance',
  definition(t) {
    t.nonNull.string('currency')
    t.nonNull.float('amount')
    t.nonNull.float('pending_amount')
  },
})

/* Resolvers */
export const GetStripeBalance = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('stripeBalance', {
      type: StripeBalance,
      async resolve(_, input, { prisma, authenticated }: Context) {
        const bookitProGeneral = await prisma.bookitProGeneral.findFirst({
          where: {
            company_id: authenticated.company,
          },
        })
        const stripe = new Stripe(bookitProGeneral.stripe_private_key, {
          apiVersion: '2020-08-27',
        })
        const stripe_response = await stripe.balance.retrieve()
        const balances = stripe_response.available?.map(
          ({ currency, amount }) => ({
            currency: currency,
            amount: amount / 100,
            ...stripe_response.pending
              ?.map(({ currency, amount }) => ({
                pending_amount: amount / 100,
                currency: currency,
              }))
              .find((p) => p.currency === currency),
          })
        )
        return balances
      },
    })
  },
})
