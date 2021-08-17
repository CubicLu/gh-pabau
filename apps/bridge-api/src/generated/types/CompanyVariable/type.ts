import { objectType } from 'nexus'

export const CompanyVariable = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CompanyVariable',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('key')
    t.string('value')
    t.field('date_created', { type: 'DateTime' })
  },
})
