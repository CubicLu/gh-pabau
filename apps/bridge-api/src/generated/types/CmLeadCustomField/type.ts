import { objectType } from 'nexus'

export const CmLeadCustomField = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmLeadCustomField',
  definition(t) {
    t.int('id')
    t.int('lead_id')
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
    t.nullable.field('CustomField', {
      type: 'ManageCustomField',
      resolve(root: any) {
        return root.CustomField
      },
    })
    t.field('Lead', {
      type: 'CmLead',
      resolve(root: any) {
        return root.Lead
      },
    })
    t.list.field('CmLeadCustomFieldOrder', {
      type: 'CmLeadCustomFieldOrder',
      args: {
        where: 'CmLeadCustomFieldOrderWhereInput',
        orderBy: 'CmLeadCustomFieldOrderOrderByWithRelationInput',
        cursor: 'CmLeadCustomFieldOrderWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmLeadCustomFieldOrderScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmLeadCustomFieldOrder
      },
    })
    t.field('_count', {
      type: 'CmLeadCustomFieldCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
