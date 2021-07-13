import { queryField, nonNull, list } from 'nexus'

export const CmPurchaseItemFindManyQuery = queryField(
  'findManyCmPurchaseItem',
  {
    type: nonNull(list(nonNull('CmPurchaseItem'))),
    args: {
      where: 'CmPurchaseItemWhereInput',
      orderBy: list('CmPurchaseItemOrderByInput'),
      cursor: 'CmPurchaseItemWhereUniqueInput',
      distinct: 'CmPurchaseItemScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmPurchaseItem.findMany({
        ...args,
        ...select,
      })
    },
  },
)
