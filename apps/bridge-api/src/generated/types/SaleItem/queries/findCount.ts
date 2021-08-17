import { queryField, nonNull, list } from 'nexus'

export const SaleItemFindCountQuery = queryField('findManySaleItemCount', {
  type: nonNull('Int'),
  args: {
    where: 'SaleItemWhereInput',
    orderBy: list('SaleItemOrderByInput'),
    cursor: 'SaleItemWhereUniqueInput',
    distinct: 'SaleItemScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.saleItem.count(args as any)
  },
})
