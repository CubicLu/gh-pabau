import { objectType } from 'nexus'

export const CompanyLocation = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CompanyLocation',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('location')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
