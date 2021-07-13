import { queryField, nonNull, list } from 'nexus'

export const InvSaleItemFindCountQuery = queryField(
  'findManyInvSaleItemCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InvSaleItemWhereInput',
      orderBy: list('InvSaleItemOrderByInput'),
      cursor: 'InvSaleItemWhereUniqueInput',
      distinct: 'InvSaleItemScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invSaleItem.count(args as any)
    },
  },
)
