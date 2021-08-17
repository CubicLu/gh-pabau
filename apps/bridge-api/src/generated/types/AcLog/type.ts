import { objectType } from 'nexus'

export const AcLog = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AcLog',
  definition(t) {
    t.int('id')
    t.int('url_id')
    t.int('action_id')
    t.boolean('critical')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.int('user_id')
    t.field('date', { type: 'DateTime' })
    t.nullable.string('humanize')
    t.string('user_agent')
    t.int('ipv4')
    t.int('row_aff')
    t.int('row_id')
    t.nullable.string('row_data')
  },
})
