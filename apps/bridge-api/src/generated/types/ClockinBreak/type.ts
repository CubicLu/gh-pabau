import { objectType } from 'nexus'

export const ClockinBreak = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ClockinBreak',
  definition(t) {
    t.int('break_time_id')
    t.int('clock_id')
    t.int('break_time_start')
    t.int('break_time_out')
  },
})
