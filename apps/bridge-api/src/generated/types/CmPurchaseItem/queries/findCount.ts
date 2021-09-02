import { queryField, nonNull, list } from 'nexus'

export const CmPurchaseItemFindCountQuery = queryField(
  'findManyCmPurchaseItemCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmPurchaseItemWhereInput',
      orderBy: list('CmPurchaseItemOrderByWithRelationInput'),
      cursor: 'CmPurchaseItemWhereUniqueInput',
      distinct: 'CmPurchaseItemScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmPurchaseItem.count(args as any)
    },
  },
)
