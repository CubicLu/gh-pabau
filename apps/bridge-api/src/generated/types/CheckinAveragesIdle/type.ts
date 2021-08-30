import { objectType } from 'nexus'

export const CheckinAveragesIdle = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CheckinAveragesIdle',
  definition(t) {
    t.int('id')
    t.string('username')
    t.int('uid')
    t.nullable.float('avg')
    t.nullable.float('retailutilisation_avg')
  },
})
