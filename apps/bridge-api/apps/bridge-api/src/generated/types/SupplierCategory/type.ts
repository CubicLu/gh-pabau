import { objectType } from 'nexus'

export const SupplierCategory = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'SupplierCategory',
  definition(t) {
    t.int('id')
    t.string('category_name')
    t.nullable.int('company_id')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
