import { queryField, list } from 'nexus'

export const CmPurchaseOrderAggregateQuery = queryField(
  'aggregateCmPurchaseOrder',
  {
    type: 'AggregateCmPurchaseOrder',
    args: {
      where: 'CmPurchaseOrderWhereInput',
      orderBy: list('CmPurchaseOrderOrderByInput'),
      cursor: 'CmPurchaseOrderWhereUniqueInput',
      distinct: 'CmPurchaseOrderScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmPurchaseOrder.aggregate({ ...args, ...select }) as any
    },
  },
)
