import {
  extendType,
  floatArg,
  list,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import Stripe from 'stripe'
import { Context } from '../../context'
import PabauFee from '../../app/pabau-fee/PabauFee'

interface PaymentIntentInput {
  currency: string
  amount: number
  description: string
  payment_method_types: Array<string>
  capture_method: 'automatic' | 'manual'
}

const PaymentHistory = objectType({
  name: 'PaymentHistory',
  definition(t) {
    t.nonNull.string('payment_id')
    t.nonNull.float('amount')
    t.nonNull.string('currency')
    t.nonNull.int('created')
    t.string('description')
    t.string('status')
  },
})
const StripePaymentIntent = objectType({
  name: 'StripePaymentIntent',
  definition(t) {
    t.nonNull.string('paymentIntentID')
    t.nonNull.string('status')
    t.nonNull.string('message')
    t.nonNull.string('clientSecret')
  },
})

export const GetStripePayments = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('paymentHistory', {
      type: PaymentHistory,
      description: 'Get Payments History from Stripe',
      async resolve(_, args, ctx: Context) {
        const companyMeta = await ctx.prisma.companyMeta.findFirst({
          where: {
            company_id: ctx.authenticated.company,
            meta_name: 'stripe_account_id',
          },
        })
        const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
          apiVersion: '2020-08-27',
        })
        const stripe_response = await stripe.charges.list(
          {
            limit: 100,
          },
          {
            stripeAccount: companyMeta.meta_value,
          }
        )
        const payouts = stripe_response.data?.map(
          ({ id, created, currency, amount, description, status }) => ({
            payment_id: id,
            currency,
            amount: amount / 100,
            created,
            description,
            status,
          })
        )
        return payouts
      },
    })
  },
})

export const paymentIntentStripe = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('paymentIntent', {
      type: StripePaymentIntent,
      description: 'Create a new Payment Intent in Stripe',
      args: {
        currency: nonNull(stringArg()),
        amount: nonNull(floatArg()),
        description: nonNull(stringArg()),
        payment_method_types: list(stringArg()),
        capture_method: stringArg(),
      },
      async resolve(_, input: PaymentIntentInput, ctx: Context) {
        const {
          amount: inputAmount,
          currency: inputCurrency,
          description: inputDescription,
          payment_method_types: inputMethodTypes,
          capture_method: inputCaptureMethod,
        } = input
        const companyMeta = await ctx.prisma.companyMeta.findFirst({
          where: {
            company_id: ctx.authenticated.company,
            meta_name: 'stripe_account_id',
          },
        })
        const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
          apiVersion: '2020-08-27',
        })
        const Fee = new PabauFee(ctx, inputAmount)
        const feeAmount = await Fee.calculatePabauFee()
        try {
          const paymentIntent = await stripe.paymentIntents.create({
            currency: inputCurrency,
            amount: Math.round((inputAmount + Number.EPSILON) * 100),
            description: inputDescription,
            application_fee_amount: feeAmount,
            transfer_data: {
              destination: companyMeta.meta_value,
            },
            on_behalf_of: companyMeta.meta_value,
            payment_method_types: inputMethodTypes,
            metadata: {
              test_metadata: 'Stan Test',
            },
            capture_method: inputCaptureMethod,
          })
          return {
            paymentIntentID: paymentIntent.id,
            message: 'Payment Intent Created',
            status: paymentIntent.status,
            clientSecret: paymentIntent.client_secret,
          }
        } catch (error) {
          return {
            paymentIntentID: '',
            message: error.message,
            status: 'Error',
            clientSecret: '',
          }
        }
      },
    })
  },
})

export const capturePaymentIntent = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('captureIntent', {
      type: StripePaymentIntent,
      description:
        'Captures a payment intent if the capture_method is set to manual',
      args: {
        paymentIntentID: nonNull(stringArg()),
      },
      async resolve(_, input) {
        const { paymentIntentID } = input
        const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
          apiVersion: '2020-08-27',
        })

        try {
          const paymentIntent = await stripe.paymentIntents.capture(
            paymentIntentID
          )
          return {
            paymentIntentID: paymentIntent.id,
            message: 'Payment Intent Captured',
            status: paymentIntent.status,
            clientSecret: paymentIntent.client_secret,
          }
        } catch {
          return {
            paymentIntentID: '',
            message: 'Capture Failed',
            status: '',
            clientSecret: '',
          }
        }
      },
    })
  },
})
