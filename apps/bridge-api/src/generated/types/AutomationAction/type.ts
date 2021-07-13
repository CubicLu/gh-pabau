import { objectType } from 'nexus'

export const AutomationAction = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AutomationAction',
  definition(t) {
    t.int('id')
    t.int('trigger_id')
    t.int('company')
    t.string('code')
    t.string('action_data')
    t.int('order')
  },
})
