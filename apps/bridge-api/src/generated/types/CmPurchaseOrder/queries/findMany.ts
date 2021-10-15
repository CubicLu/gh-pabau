import { queryField, nonNull, list } from 'nexus'

export const CmPurchaseOrderFindManyQuery = queryField(
  'findManyCmPurchaseOrder',
  {
    type: nonNull(list(nonNull('CmPurchaseOrder'))),
    args: {
      where: 'CmPurchaseOrderWhereInput',
      orderBy: list('CmPurchaseOrderOrderByInput'),
      cursor: 'CmPurchaseOrderWhereUniqueInput',
      distinct: 'CmPurchaseOrderScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmPurchaseOrder.findMany({
        ...args,
        ...select,
      })
    },
  },
)
