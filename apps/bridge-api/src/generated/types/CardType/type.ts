import { objectType } from 'nexus'

export const CardType = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CardType',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('mastercard')
    t.int('visa')
    t.int('amex')
    t.int('visa_credit')
    t.int('maestro')
    t.int('worldpay')
    t.float('visa_credit_charge')
    t.float('amex_credit_charge')
    t.float('mastercard_credit_charge')
    t.int('enable_reference')
  },
})
