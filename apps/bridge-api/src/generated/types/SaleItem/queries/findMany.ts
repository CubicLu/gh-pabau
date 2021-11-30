import { queryField, nonNull, list } from 'nexus'

export const SaleItemFindManyQuery = queryField('findManySaleItem', {
  type: nonNull(list(nonNull('SaleItem'))),
  args: {
    where: 'SaleItemWhereInput',
    orderBy: list('SaleItemOrderByWithRelationInput'),
    cursor: 'SaleItemWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('SaleItemScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.saleItem.findMany({
      ...args,
      ...select,
    })
  },
})
