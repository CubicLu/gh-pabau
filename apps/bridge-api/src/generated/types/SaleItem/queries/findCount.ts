import { queryField, nonNull, list } from 'nexus'

export const SaleItemFindCountQuery = queryField('findManySaleItemCount', {
  type: nonNull('Int'),
  args: {
    where: 'SaleItemWhereInput',
    orderBy: list('SaleItemOrderByWithRelationInput'),
    cursor: 'SaleItemWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('SaleItemScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.saleItem.count(args as any)
  },
})
