import { queryField, list } from 'nexus'

export const CmPurchaseOrderFindFirstQuery = queryField(
  'findFirstCmPurchaseOrder',
  {
    type: 'CmPurchaseOrder',
    args: {
      where: 'CmPurchaseOrderWhereInput',
      orderBy: list('CmPurchaseOrderOrderByWithRelationInput'),
      cursor: 'CmPurchaseOrderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmPurchaseOrderScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmPurchaseOrder.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
