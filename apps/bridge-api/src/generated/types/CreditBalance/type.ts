import { objectType } from 'nexus'

export const CreditBalance = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CreditBalance',
  definition(t) {
    t.int('credit_balance_id')
    t.string('company')
    t.float('balance')
    t.float('balance_currency')
    t.int('auto')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.int('companyId')
  },
})
