import { objectType } from 'nexus'

export const AutomationFolder = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AutomationFolder',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('name')
    t.string('description')
  },
})
