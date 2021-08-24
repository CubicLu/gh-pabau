import { objectType } from 'nexus'

export const CmLeadCustomFieldOrder = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmLeadCustomFieldOrder',
  definition(t) {
    t.int('id')
    t.int('field_id')
    t.string('field_name')
    t.int('company_id')
    t.bigint('order_id')
    t.int('is_more')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('CmLeadCustomField', {
      type: 'CmLeadCustomField',
      resolve(root: any) {
        return root.CmLeadCustomField
      },
    })
  },
})
