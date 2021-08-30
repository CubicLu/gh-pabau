import { objectType } from 'nexus'

export const AcLogAction = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AcLogAction',
  definition(t) {
    t.int('id')
    t.string('pabauid')
    t.string('action_name')
    t.boolean('action_status')
    t.string('command')
    t.string('table_aff')
    t.int('row_aff')
    t.int('row_id')
  },
})
