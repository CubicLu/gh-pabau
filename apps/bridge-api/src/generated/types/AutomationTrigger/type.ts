import { objectType } from 'nexus'

export const AutomationTrigger = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AutomationTrigger',
  definition(t) {
    t.int('id')
    t.int('rule_id')
    t.string('name')
    t.int('company')
    t.string('code')
    t.string('trigger_data')
    t.int('order')
  },
})
