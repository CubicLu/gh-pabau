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
        orderBy: 'InvProductOrderByInput',
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
        orderBy: 'InvCategoryOrderByInput',
        cursor: 'InvCategoryWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvCategoryScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvCategory
      },
    })
    t.list.field('InvSaleItem', {
      type: 'InvSaleItem',
      args: {
        where: 'InvSaleItemWhereInput',
        orderBy: 'InvSaleItemOrderByInput',
        cursor: 'InvSaleItemWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvSaleItemScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvSaleItem
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
