import { queryField, nonNull, list } from 'nexus'

export const SaleItemFindManyQuery = queryField('findManySaleItem', {
  type: nonNull(list(nonNull('SaleItem'))),
  args: {
    where: 'SaleItemWhereInput',
    orderBy: list('SaleItemOrderByInput'),
    cursor: 'SaleItemWhereUniqueInput',
    distinct: 'SaleItemScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.saleItem.findMany({
      ...args,
      ...select,
    })
  },
})
