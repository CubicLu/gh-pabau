import { objectType } from 'nexus'

export const CmContactLabel = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmContactLabel',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('contact_id')
    t.int('label_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('CmContact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.CmContact
      },
    })
    t.field('CmLabel', {
      type: 'CmLabel',
      resolve(root: any) {
        return root.CmLabel
      },
    })
  },
})
