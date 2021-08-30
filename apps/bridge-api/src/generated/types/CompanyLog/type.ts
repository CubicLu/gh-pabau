import { objectType } from 'nexus'

export const CompanyLog = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CompanyLog',
  definition(t) {
    t.int('id')
    t.field('log_date', { type: 'DateTime' })
    t.string('text')
    t.string('category')
    t.boolean('severe')
    t.int('company_id')
  },
})
