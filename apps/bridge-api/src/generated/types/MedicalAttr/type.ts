import { objectType } from 'nexus'

export const MedicalAttr = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'MedicalAttr',
  definition(t) {
    t.int('id')
    t.nullable.string('name')
    t.nullable.field('created_at', { type: 'DateTime' })
    t.nullable.field('updated_at', { type: 'DateTime' })
    t.nullable.field('deleted_at', { type: 'DateTime' })
    t.nullable.int('company_id')
    t.string('description')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
