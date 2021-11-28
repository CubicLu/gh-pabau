import { objectType } from 'nexus'

export const CreditCostType = objectType({
  name: 'CreditCostType',
  definition(t) {
    t.int('amount')
    t.float('total')
    t.float('cost')
  },
})
