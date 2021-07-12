import { objectType } from 'nexus'

export const CompanyPermission = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CompanyPermission',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.nullable.int('section')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('Page', {
      type: 'Page',
      resolve(root: any) {
        return root.Page
      },
    })
  },
})
