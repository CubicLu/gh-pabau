import { objectType } from 'nexus'

export const CustomFieldDisplay = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CustomFieldDisplay',
  definition(t) {
    t.int('field_id')
    t.nullable.int('depends_on')
    t.nullable.string('value')
    t.nullable.int('company_id')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('ManageCustomField', {
      type: 'ManageCustomField',
      resolve(root: any) {
        return root.ManageCustomField
      },
    })
  },
})
