import { objectType } from 'nexus'

export const ClassCategory = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ClassCategory',
  definition(t) {
    t.int('id')
    t.string('code')
    t.string('name')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.int('uid')
    t.nullable.field('created_date', { type: 'DateTime' })
    t.nullable.field('modified_date', { type: 'DateTime' })
  },
})
