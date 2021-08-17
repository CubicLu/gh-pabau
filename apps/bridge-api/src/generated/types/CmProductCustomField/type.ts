import { objectType } from 'nexus'

export const CmProductCustomField = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmProductCustomField',
  definition(t) {
    t.int('id')
    t.int('product_id')
    t.int('company_id')
    t.nullable.int('custom_field_id')
    t.string('custom_field_value')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('Product', {
      type: 'InvProduct',
      resolve(root: any) {
        return root.Product
      },
    })
    t.nullable.field('CustomField', {
      type: 'ManageCustomField',
      resolve(root: any) {
        return root.CustomField
      },
    })
  },
})
