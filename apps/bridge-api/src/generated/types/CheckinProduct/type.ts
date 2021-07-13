import { objectType } from 'nexus'

export const CheckinProduct = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CheckinProduct',
  definition(t) {
    t.int('id')
    t.int('queue_id')
    t.int('product_id')
    t.nullable.field('date_start', { type: 'DateTime' })
    t.nullable.field('date_end', { type: 'DateTime' })
    t.int('inv_product_id')
  },
})
