import { objectType } from 'nexus'

export const ManageCustomFieldItem = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ManageCustomFieldItem',
  definition(t) {
    t.int('id')
    t.nullable.int('field_id')
    t.nullable.int('company_id')
    t.string('item_label')
    t.string('item_value')
    t.int('item_order')
    t.nullable.field('CustomField', {
      type: 'ManageCustomField',
      resolve(root: any) {
        return root.CustomField
      },
    })
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
