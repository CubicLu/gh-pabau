import { queryField, nonNull, list } from 'nexus'

export const CmPurchaseOrderFindManyQuery = queryField(
  'findManyCmPurchaseOrder',
  {
    type: nonNull(list(nonNull('CmPurchaseOrder'))),
    args: {
      where: 'CmPurchaseOrderWhereInput',
      orderBy: list('CmPurchaseOrderOrderByWithRelationInput'),
      cursor: 'CmPurchaseOrderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmPurchaseOrderScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmPurchaseOrder.findMany({
        ...args,
        ...select,
      })
    },
  },
)
