import { objectType } from 'nexus'

export const ManageCustomField = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ManageCustomField',
  definition(t) {
    t.int('id')
    t.nullable.string('field_label')
    t.nullable.string('field_type')
    t.nullable.int('company_id')
    t.nullable.int('user_id')
    t.nullable.int('location_id')
    t.nullable.field('created_date', { type: 'DateTime' })
    t.nullable.field('modified_date', { type: 'DateTime' })
    t.int('treatment_interest')
    t.int('show_in_leads')
    t.field('field_for', { type: 'manage_custom_fields_field_for' })
    t.boolean('flagged')
    t.int('is_required')
    t.int('disable_app')
    t.boolean('is_active')
    t.int('field_order')
    t.int('display_in_invoice')
    t.int('default_in_reports')
    t.nullable.int('category_id')
    t.boolean('in_cc_toolbar')
    t.boolean('favorite')
    t.boolean('show_in_cal')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.nullable.field('Location', {
      type: 'CompanyBranch',
      resolve(root: any) {
        return root.Location
      },
    })
    t.nullable.field('Category', {
      type: 'ManageCustomFieldCategory',
      resolve(root: any) {
        return root.Category
      },
    })
    t.list.field('ManageCustomFieldItem', {
      type: 'ManageCustomFieldItem',
      args: {
        where: 'ManageCustomFieldItemWhereInput',
        orderBy: 'ManageCustomFieldItemOrderByWithRelationInput',
        cursor: 'ManageCustomFieldItemWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ManageCustomFieldItemScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ManageCustomFieldItem
      },
    })
    t.list.field('CmProductCustomField', {
      type: 'CmProductCustomField',
      args: {
        where: 'CmProductCustomFieldWhereInput',
        orderBy: 'CmProductCustomFieldOrderByWithRelationInput',
        cursor: 'CmProductCustomFieldWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmProductCustomFieldScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmProductCustomField
      },
    })
    t.list.field('CmContactCustom', {
      type: 'CmContactCustom',
      args: {
        where: 'CmContactCustomWhereInput',
        orderBy: 'CmContactCustomOrderByWithRelationInput',
        cursor: 'CmContactCustomWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactCustomScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactCustom
      },
    })
    t.list.field('CmLeadCustomField', {
      type: 'CmLeadCustomField',
      args: {
        where: 'CmLeadCustomFieldWhereInput',
        orderBy: 'CmLeadCustomFieldOrderByWithRelationInput',
        cursor: 'CmLeadCustomFieldWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmLeadCustomFieldScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmLeadCustomField
      },
    })
    t.list.field('CustomFieldDisplay', {
      type: 'CustomFieldDisplay',
      args: {
        where: 'CustomFieldDisplayWhereInput',
        orderBy: 'CustomFieldDisplayOrderByWithRelationInput',
        cursor: 'CustomFieldDisplayWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CustomFieldDisplayScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CustomFieldDisplay
      },
    })
    t.field('_count', {
      type: 'ManageCustomFieldCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
