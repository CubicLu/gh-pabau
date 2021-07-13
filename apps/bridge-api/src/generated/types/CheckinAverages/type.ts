import { objectType } from 'nexus'

export const CheckinAverages = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CheckinAverages',
  definition(t) {
    t.int('id')
    t.int('uid')
    t.int('product_id')
    t.int('avg_time_seconds')
  },
})
