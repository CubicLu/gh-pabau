import { extendType, objectType } from 'nexus'
import Stripe from 'stripe'
import { Context } from '../../context'

const StripeBankAccounts = objectType({
  name: 'StripeBankAccounts',
  definition(t) {
    t.string('id')
    t.string('object')
    t.string('account_holder_name')
    t.string('account_holder_type')
    t.string('bank_name')
    t.string('country')
    t.string('currency')
    t.string('fingerprint')
    t.string('last4')
    t.string('routing_number')
    t.string('status')
    t.string('account')
  },
})

export const GetStripeBankAccounts = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('stripeBankDetails', {
      type: StripeBankAccounts,
      description: 'Get List of Bank Accounts connected to Stripe login',
      async resolve(_, input, { prisma, authenticated }: Context) {
        const companyMeta = await prisma.companyMeta.findFirst({
          where: {
            company_id: authenticated.company,
            meta_name: 'stripe_account_id',
          },
        })
        const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
          apiVersion: '2020-08-27',
        })
        const stripe_response = await stripe.accounts.listExternalAccounts(
          companyMeta.meta_value
        )
        return stripe_response.data as any
      },
    })
  },
})
