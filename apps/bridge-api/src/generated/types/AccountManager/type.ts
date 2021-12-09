import { objectType } from 'nexus'

export const AccountManager = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AccountManager',
  definition(t) {
    t.int('id')
    t.nullable.string('organisation_name')
    t.int('organisation_status')
    t.nullable.int('organisation_type')
    t.nullable.string('organisation_number')
    t.nullable.int('organisation_owner')
    t.nullable.string('address1')
    t.nullable.string('address2')
    t.nullable.string('address3')
    t.nullable.string('town')
    t.nullable.string('county')
    t.nullable.string('post_code')
    t.nullable.string('country')
    t.nullable.string('tel')
    t.nullable.string('alt_tel')
    t.nullable.string('email')
    t.nullable.string('fax')
    t.nullable.string('website')
    t.nullable.int('sla_contract')
    t.string('vat_reg_id')
    t.nullable.field('created_date', { type: 'DateTime' })
    t.nullable.field('modified_date', { type: 'DateTime' })
    t.nullable.int('company_id')
    t.string('con_per_1')
    t.string('con_num_1')
    t.string('con_per_2')
    t.string('con_num_2')
    t.string('con_per_3')
    t.string('con_num_3')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('CmPurchaseOrder', {
      type: 'CmPurchaseOrder',
      args: {
        where: 'CmPurchaseOrderWhereInput',
        orderBy: 'CmPurchaseOrderOrderByWithRelationInput',
        cursor: 'CmPurchaseOrderWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmPurchaseOrderScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmPurchaseOrder
      },
    })
    t.list.field('InvProduct', {
      type: 'InvProduct',
      args: {
        where: 'InvProductWhereInput',
        orderBy: 'InvProductOrderByWithRelationInput',
        cursor: 'InvProductWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvProductScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvProduct
      },
    })
    t.nullable.field('_count', {
      type: 'AccountManagerCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
