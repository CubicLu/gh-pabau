import { queryField, nonNull, list } from 'nexus'

export const CmPurchaseItemFindManyQuery = queryField(
  'findManyCmPurchaseItem',
  {
    type: nonNull(list(nonNull('CmPurchaseItem'))),
    args: {
      where: 'CmPurchaseItemWhereInput',
      orderBy: list('CmPurchaseItemOrderByWithRelationInput'),
      cursor: 'CmPurchaseItemWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmPurchaseItemScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmPurchaseItem.findMany({
        ...args,
        ...select,
      })
    },
  },
)
