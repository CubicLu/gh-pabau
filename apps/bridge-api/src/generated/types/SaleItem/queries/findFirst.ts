import { queryField, list } from 'nexus'

export const SaleItemFindFirstQuery = queryField('findFirstSaleItem', {
  type: 'SaleItem',
  args: {
    where: 'SaleItemWhereInput',
    orderBy: list('SaleItemOrderByWithRelationInput'),
    cursor: 'SaleItemWhereUniqueInput',
    distinct: 'SaleItemScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.saleItem.findFirst({
      ...args,
      ...select,
    })
  },
})
