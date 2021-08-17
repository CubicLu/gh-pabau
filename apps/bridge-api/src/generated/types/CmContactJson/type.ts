import { objectType } from 'nexus'

export const CmContactJson = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmContactJson',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('clients_json')
    t.field('date_updated', { type: 'DateTime' })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
