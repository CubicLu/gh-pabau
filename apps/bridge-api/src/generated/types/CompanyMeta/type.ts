import { objectType } from 'nexus'

export const CompanyMeta = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CompanyMeta',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('meta_name')
    t.string('meta_value')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
