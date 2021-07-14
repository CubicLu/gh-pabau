import { queryField, list } from 'nexus'

export const CmPurchaseItemFindFirstQuery = queryField(
  'findFirstCmPurchaseItem',
  {
    type: 'CmPurchaseItem',
    args: {
      where: 'CmPurchaseItemWhereInput',
      orderBy: list('CmPurchaseItemOrderByInput'),
      cursor: 'CmPurchaseItemWhereUniqueInput',
      distinct: 'CmPurchaseItemScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmPurchaseItem.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
