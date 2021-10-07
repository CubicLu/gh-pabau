import { objectType } from 'nexus'

export const ApiDebug = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ApiDebug',
  definition(t) {
    t.int('id')
    t.string('data_received')
    t.int('company_id')
    t.int('api_code')
    t.field('created_date', { type: 'DateTime' })
    t.string('data_type')
  },
})
