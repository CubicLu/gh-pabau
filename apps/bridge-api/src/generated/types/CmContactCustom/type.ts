import { objectType } from 'nexus'

export const CmContactCustom = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmContactCustom',
  definition(t) {
    t.int('id')
    t.int('contact_id')
    t.int('company_id')
    t.int('custom_field_id')
    t.string('custom_field_label')
    t.string('custom_field_value')
    t.nullable.int('imported')
    t.nullable.string('old_value')
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
    t.field('ManageCustomField', {
      type: 'ManageCustomField',
      resolve(root: any) {
        return root.ManageCustomField
      },
    })
  },
})
