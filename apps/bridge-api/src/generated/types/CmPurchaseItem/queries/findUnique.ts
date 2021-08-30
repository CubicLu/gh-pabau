import { queryField, nonNull } from 'nexus'

export const CmPurchaseItemFindUniqueQuery = queryField(
  'findUniqueCmPurchaseItem',
  {
    type: 'CmPurchaseItem',
    args: {
      where: nonNull('CmPurchaseItemWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmPurchaseItem.findUnique({
        where,
        ...select,
      })
    },
  },
)
