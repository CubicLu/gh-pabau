import { extendType, nonNull, objectType, stringArg } from 'nexus'
import Stripe from 'stripe'
import { Context } from '../../context'

interface ConnectStripeInput {
  code: string
}
const ConnectStripe = objectType({
  name: 'ConnectStripe',
  definition(t) {
    t.string('access_token')
    t.boolean('livemode')
    t.string('refresh_token')
    t.string('token_type')
    t.string('stripe_publishable_key')
    t.string('stripe_user_id')
    t.string('scope')
  },
})

export const stripeOnboarding = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('connectStripe', {
      type: ConnectStripe,
      description:
        'Stripe Onboarding Integration, Connects User Account to Pabau Stripe Account -> Stripe Express',
      args: {
        code: nonNull(stringArg()),
      },
      async resolve(
        _,
        input: ConnectStripeInput,
        { prisma, authenticated }: Context
      ) {
        const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
          apiVersion: '2020-08-27',
        })
        const response = await stripe.oauth.token({
          grant_type: 'authorization_code',
          code: input.code,
        })
        await prisma.bookitProGeneral.updateMany({
          where: {
            company_id: authenticated.company,
          },
          data: {
            stripe_private_key: {
              set: response.access_token,
            },
            stripe_public_key: {
              set: response.stripe_publishable_key,
            },
          },
        })
        await prisma.$queryRaw`INSERT INTO company_meta
        (company_id, meta_name, meta_value)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE meta_value = ?
          ${authenticated.company}
          'stripe_account_id',
         ${response.stripe_user_id}
          ${response.stripe_user_id})`
        return response
      },
    })
  },
})
