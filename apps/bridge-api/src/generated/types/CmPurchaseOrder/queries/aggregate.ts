import { queryField, list } from 'nexus'

export const CmPurchaseOrderAggregateQuery = queryField(
  'aggregateCmPurchaseOrder',
  {
    type: 'AggregateCmPurchaseOrder',
    args: {
      where: 'CmPurchaseOrderWhereInput',
      orderBy: list('CmPurchaseOrderOrderByWithRelationInput'),
      cursor: 'CmPurchaseOrderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmPurchaseOrder.aggregate({ ...args, ...select }) as any
    },
  },
)
