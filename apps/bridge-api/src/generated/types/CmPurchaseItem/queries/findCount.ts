import { queryField, nonNull, list } from 'nexus'

export const CmPurchaseItemFindCountQuery = queryField(
  'findManyCmPurchaseItemCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmPurchaseItemWhereInput',
      orderBy: list('CmPurchaseItemOrderByWithRelationInput'),
      cursor: 'CmPurchaseItemWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmPurchaseItemScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmPurchaseItem.count(args as any)
    },
  },
)
