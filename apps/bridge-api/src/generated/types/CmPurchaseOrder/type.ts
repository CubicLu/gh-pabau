import { objectType } from 'nexus'

export const CmPurchaseOrder = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmPurchaseOrder',
  definition(t) {
    t.int('id')
    t.string('order_no')
    t.int('date')
    t.string('status')
    t.int('company_id')
    t.nullable.int('location_id')
    t.nullable.int('user_id')
    t.nullable.int('supplier_id')
    t.string('supplier_status')
    t.nullable.field('delivery_date', { type: 'DateTime' })
    t.string('notes')
    t.int('is_hidden')
    t.string('destination_arrival')
    t.string('freight_terms')
    t.string('terms_of_payment')
    t.string('currency')
    t.string('tags')
    t.nullable.int('category_id')
    t.string('lpo_number')
    t.string('grn_number')
    t.nullable.field('Location', {
      type: 'CompanyBranch',
      resolve(root: any) {
        return root.Location
      },
    })
    t.field('Company', {
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
    t.nullable.field('Supplier', {
      type: 'AccountManager',
      resolve(root: any) {
        return root.Supplier
      },
    })
    t.nullable.field('Category', {
      type: 'InvCategory',
      resolve(root: any) {
        return root.Category
      },
    })
    t.list.field('CmPurchaseItem', {
      type: 'CmPurchaseItem',
      args: {
        where: 'CmPurchaseItemWhereInput',
        orderBy: 'CmPurchaseItemOrderByWithRelationInput',
        cursor: 'CmPurchaseItemWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmPurchaseItemScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmPurchaseItem
      },
    })
    t.nullable.field('_count', {
      type: 'CmPurchaseOrderCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
