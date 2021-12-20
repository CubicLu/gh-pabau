import { extendType, floatArg, nonNull, objectType, stringArg } from 'nexus'
import Stripe from 'stripe'
import { Context } from '../../context'

interface StripePayoutResponse {
  payout_id: string
  success: boolean
  message: string
}
interface RequestPayoutInput {
  currency: string
  amount: number
  description: string
  descriptor: string
}

const StripePayout = objectType({
  name: 'StripePayout',
  definition(t) {
    t.nonNull.string('payout_id')
    t.nonNull.boolean('success')
    t.nonNull.string('message')
  },
})

const PayoutHistory = objectType({
  name: 'PayoutHistory',
  definition(t) {
    t.nonNull.string('payout_id')
    t.nonNull.float('amount')
    t.nonNull.string('currency')
    t.nonNull.int('created')
    t.string('statement_descriptor')
    t.string('description')
    t.string('status')
  },
})
export const stripeRequestPayout = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('stripePayout', {
      type: StripePayout,
      description: 'Request Stripe Payout',
      args: {
        currency: nonNull(stringArg()),
        amount: nonNull(floatArg()),
        description: nonNull(stringArg()),
        descriptor: nonNull(stringArg()),
      },
      async resolve(_, input: RequestPayoutInput, ctx: Context) {
        const {
          amount: inputAmount,
          currency: inputCurrency,
          description: inputDescription,
          descriptor: inputDescriptor,
        } = input
        const bookitProGeneral = await ctx.prisma.bookitProGeneral.findFirst({
          where: {
            company_id: ctx.authenticated.company,
          },
        })
        const stripe = new Stripe(bookitProGeneral.stripe_private_key, {
          apiVersion: '2020-08-27',
        })
        try {
          const payout = await stripe.payouts.create({
            currency: inputCurrency,
            amount: Math.round((inputAmount + Number.EPSILON) * 100),
            description: inputDescription,
            statement_descriptor: inputDescriptor,
          })
          return {
            payout_id: payout.id,
            message: 'Payout Sucessfull',
            success: true,
          } as StripePayoutResponse
        } catch (error) {
          return {
            payout_id: '',
            message: error.message,
            success: false,
          } as StripePayoutResponse
        }
      },
    })
  },
})

export const GetStripePayouts = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('payoutHistory', {
      type: PayoutHistory,
      description: 'Get Payout History from Stripe',
      async resolve(_, args, ctx: Context) {
        const bookitProGeneral = await ctx.prisma.bookitProGeneral.findFirst({
          where: {
            company_id: ctx.authenticated.company,
          },
        })
        const stripe = new Stripe(bookitProGeneral.stripe_private_key, {
          apiVersion: '2020-08-27',
        })
        const stripe_response = await stripe.payouts.list({ limit: 100 })
        const payouts = stripe_response.data?.map(
          ({
            id,
            created,
            currency,
            amount,
            description,
            statement_descriptor,
            status,
          }) => ({
            payout_id: id,
            currency,
            amount: amount / 100,
            created,
            description,
            statement_descriptor,
            status,
          })
        )
        return payouts
      },
    })
  },
})
