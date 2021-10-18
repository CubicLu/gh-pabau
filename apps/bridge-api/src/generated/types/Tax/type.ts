import { objectType } from 'nexus'

export const Tax = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Tax',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('value')
    t.float('rate')
    t.int('hidden')
    t.int('default')
    t.nullable.int('company_id')
    t.int('custom_id')
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
    t.list.field('InvCategory', {
      type: 'InvCategory',
      args: {
        where: 'InvCategoryWhereInput',
        orderBy: 'InvCategoryOrderByWithRelationInput',
        cursor: 'InvCategoryWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvCategoryScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvCategory
      },
    })
    t.list.field('SaleItem', {
      type: 'SaleItem',
      args: {
        where: 'SaleItemWhereInput',
        orderBy: 'SaleItemOrderByWithRelationInput',
        cursor: 'SaleItemWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SaleItemScalarFieldEnum',
      },
      resolve(root: any) {
        return root.SaleItem
      },
    })
    t.nullable.field('_count', {
      type: 'TaxCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
