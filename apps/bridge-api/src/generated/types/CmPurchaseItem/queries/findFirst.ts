import { queryField, list } from 'nexus'

export const CmPurchaseItemFindFirstQuery = queryField(
  'findFirstCmPurchaseItem',
  {
    type: 'CmPurchaseItem',
    args: {
      where: 'CmPurchaseItemWhereInput',
      orderBy: list('CmPurchaseItemOrderByWithRelationInput'),
      cursor: 'CmPurchaseItemWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmPurchaseItemScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmPurchaseItem.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
