import { objectType } from 'nexus'

export const AutomationRule = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AutomationRule',
  definition(t) {
    t.int('id')
    t.string('name')
    t.int('company')
    t.boolean('active')
    t.string('source')
    t.nullable.field('date_start', { type: 'DateTime' })
    t.nullable.field('date_end', { type: 'DateTime' })
    t.string('description')
    t.int('needs_config')
    t.int('folder_id')
  },
})
