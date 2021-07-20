import { objectType } from 'nexus'

export const AutomationDelay = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AutomationDelay',
  definition(t) {
    t.int('id')
    t.string('action_rows')
    t.string('data_array')
    t.string('code')
    t.int('company')
    t.int('delay')
    t.field('date_queued', { type: 'DateTime' })
    t.nullable.int('appointment_id')
  },
})
