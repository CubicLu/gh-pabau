import { objectType } from 'nexus'

export const MedicalFormMacro = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'MedicalFormMacro',
  definition(t) {
    t.int('id')
    t.field('createdAt', { type: 'DateTime' })
    t.string('title')
    t.string('message')
    t.int('type')
    t.int('created_by')
    t.nullable.int('company_id')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
