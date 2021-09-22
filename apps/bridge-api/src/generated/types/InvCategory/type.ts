import { objectType } from 'nexus'

export const InvCategory = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'InvCategory',
  definition(t) {
    t.int('id')
    t.string('code')
    t.string('name')
    t.nullable.bigint('order')
    t.nullable.string('category_type')
    t.nullable.int('company_id')
    t.nullable.int('user_id')
    t.nullable.field('created_date', { type: 'DateTime' })
    t.nullable.field('modified_date', { type: 'DateTime' })
    t.int('custom_id')
    t.int('PriceListGroup_id')
    t.int('imported')
    t.int('technical')
    t.string('image')
    t.boolean('disabled')
    t.nullable.int('tax_id')
    t.nullable.int('master_cat_id')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
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
    t.nullable.field('MasterCategory', {
      type: 'ServicesMasterCategory',
      resolve(root: any) {
        return root.MasterCategory
      },
    })
    t.nullable.field('ServiceCategory', {
      type: 'ServiceCategory',
      resolve(root: any) {
        return root.ServiceCategory
      },
    })
    t.nullable.field('Tax', {
      type: 'Tax',
      resolve(root: any) {
        return root.Tax
      },
    })
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
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
    t.nullable.field('_count', {
      type: 'InvCategoryCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
