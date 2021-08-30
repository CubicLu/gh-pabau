import { objectType } from 'nexus'

export const CalRangeRequest = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CalRangeRequest',
  definition(t) {
    t.int('id')
    t.int('minutes')
    t.int('company_id')
    t.field('start_date', { type: 'DateTime' })
    t.field('end_date', { type: 'DateTime' })
  },
})
