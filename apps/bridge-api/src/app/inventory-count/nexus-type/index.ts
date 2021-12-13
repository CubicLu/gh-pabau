import { objectType } from 'nexus'

export const InventoryCountCountedTotals = objectType({
  name: 'InventoryCountCountedTotals',
  definition(t) {
    t.int('totalCounted')
    t.int('totalToCount')
    t.float('overages')
    t.float('shortages')
  },
})
