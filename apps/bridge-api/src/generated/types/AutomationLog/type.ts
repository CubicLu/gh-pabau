import { objectType } from 'nexus'

export const AutomationLog = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AutomationLog',
  definition(t) {
    t.int('id')
    t.int('company')
    t.field('date_created', { type: 'DateTime' })
    t.string('message')
    t.nullable.int('parent_id')
    t.nullable.int('uid')
  },
})
