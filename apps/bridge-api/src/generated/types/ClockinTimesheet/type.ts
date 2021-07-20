import { objectType } from 'nexus'

export const ClockinTimesheet = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ClockinTimesheet',
  definition(t) {
    t.int('clock_id')
    t.int('staff_uid')
    t.int('company_id')
    t.int('clockin')
    t.int('clockout')
    t.int('total_break_time')
    t.int('total_working_time')
    t.string('notes')
    t.boolean('approved')
    t.string('staff_name')
    t.string('ip_address')
  },
})
