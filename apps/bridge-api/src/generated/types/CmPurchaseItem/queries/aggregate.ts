import { queryField, list } from 'nexus'

export const CmPurchaseItemAggregateQuery = queryField(
  'aggregateCmPurchaseItem',
  {
    type: 'AggregateCmPurchaseItem',
    args: {
      where: 'CmPurchaseItemWhereInput',
      orderBy: list('CmPurchaseItemOrderByWithRelationInput'),
      cursor: 'CmPurchaseItemWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmPurchaseItem.aggregate({ ...args, ...select }) as any
    },
  },
)
