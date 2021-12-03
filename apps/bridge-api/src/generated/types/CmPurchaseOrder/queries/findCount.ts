import { queryField, nonNull, list } from 'nexus'

export const CmPurchaseOrderFindCountQuery = queryField(
  'findManyCmPurchaseOrderCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmPurchaseOrderWhereInput',
      orderBy: list('CmPurchaseOrderOrderByWithRelationInput'),
      cursor: 'CmPurchaseOrderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmPurchaseOrderScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmPurchaseOrder.count(args as any)
    },
  },
)
