import { objectType } from 'nexus'

export const Batch = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Batch',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('order_id')
    t.nullable.string('order_item_id')
    t.string('batch_no')
    t.int('qty')
    t.int('uid')
    t.field('creation_date', { type: 'DateTime' })
    t.nullable.field('expiry_date', { type: 'DateTime' })
  },
})
