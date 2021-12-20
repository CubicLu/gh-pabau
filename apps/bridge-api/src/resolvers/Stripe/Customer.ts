import { extendType, nonNull, objectType, stringArg } from 'nexus'
import Stripe from 'stripe'
import { Context } from '../../context'

const StripeCustomer = objectType({
  name: 'StripeCustomer',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('email')
    t.string('phone')
    t.string('description')
  },
})

export const createStripeCustomer = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createStripeCustomer', {
      type: StripeCustomer,
      description: 'Create a Stripe Customer',
      args: {
        name: nonNull(stringArg()),
        email: stringArg(),
        phone: stringArg(),
      },
      async resolve(_, input, { prisma, authenticated }: Context) {
        const companyDetails = await prisma.companyDetails.findFirst({
          where: {
            company_id: authenticated.company,
          },
        })
        const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
          apiVersion: '2020-08-27',
        })
        const customer = await stripe.customers.create({
          name: input.name,
          email: input.email,
          phone: input.phone,
          description: 'Owner: ' + companyDetails.company_name,
        })

        return {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          description: customer.description,
        }
      },
    })
  },
})
