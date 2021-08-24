import { objectType } from 'nexus'

export const AccountBalance = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AccountBalance',
  definition(t) {
    t.int('id')
    t.nullable.int('contact_id')
    t.int('company_id')
    t.int('insurance_company_id')
    t.float('balance')
    t.int('imported')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('CmContact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.CmContact
      },
    })
  },
})
