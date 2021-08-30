import { intArg, objectType, stringArg } from 'nexus'

export const SubscriptionInvoice = objectType({
  name: 'SubscriptionInvoice',
  description: 'Subscription Invoice Basic Columns',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.float('amount')
    t.nonNull.string('date')
    t.nonNull.string('currency')
    t.string('invoice_link')
    t.string('description')
    t.string('status')
  },
})

export const SubscriptionDetails = objectType({
  name: 'SubscriptionDetails',
  description: 'Subscription Details Information',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('created_at')
    t.nonNull.string('currency')
    t.string('name')
    t.string('interval_unit')
    t.string('status')
    t.string('next_charge_date')
    t.float('next_charge_amount')
    t.float('app_fee')
    t.float('amount')
  },
})

export const SubscriptionCardDetails = objectType({
  name: 'SubscriptionCardDetails',
  description: 'Subscription Card and Bank Details Information',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('created_at')
    t.nonNull.string('currency')
    t.string('account_number_ending')
    t.string('bank_name')
    t.string('account_holder_name')
    t.string('last4')
    t.string('exp_year')
    t.string('exp_month')
    t.string('branch_code')
  },
})

export const SubscriptionInputTypes = {
  offset: intArg({
    default: 0,
  }),
  limit: intArg({
    default: 10,
  }),
  status: stringArg(),
  searchTerm: stringArg(),
}

export const SubscriptionCountInputTypes = {
  status: stringArg(),
  searchTerm: stringArg(),
}
