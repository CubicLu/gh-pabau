import { objectType } from 'nexus'

export const InvDetail = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'InvDetail',
  definition(t) {
    t.int('id')
    t.int('customer_id')
    t.nullable.string('guid')
    t.field('date', { type: 'DateTime' })
    t.nullable.float('amount')
    t.nullable.string('status')
    t.nullable.string('location_name')
    t.nullable.string('billers')
    t.nullable.string('issue_to')
  },
})
