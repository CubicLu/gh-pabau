import { objectType } from 'nexus'

export const CompanyPolicy = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CompanyPolicy',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('privacy_policy')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
