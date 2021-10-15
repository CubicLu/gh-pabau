import { objectType } from 'nexus'

export const CreditBalance = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CreditBalance',
  definition(t) {
    t.int('credit_balance_id')
    t.int('company_id')
    t.float('balance')
    t.float('balance_currency')
    t.int('auto')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
