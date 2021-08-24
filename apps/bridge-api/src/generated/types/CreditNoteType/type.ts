import { objectType } from 'nexus'

export const CreditNoteType = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CreditNoteType',
  definition(t) {
    t.int('id')
    t.nullable.int('company_id')
    t.string('name')
    t.int('code')
    t.nullable.string('prefix')
    t.boolean('quick_access')
    t.boolean('credit_note_type')
    t.boolean('is_disabled')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
