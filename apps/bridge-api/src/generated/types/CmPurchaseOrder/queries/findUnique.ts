import { queryField, nonNull } from 'nexus'

export const CmPurchaseOrderFindUniqueQuery = queryField(
  'findUniqueCmPurchaseOrder',
  {
    type: 'CmPurchaseOrder',
    args: {
      where: nonNull('CmPurchaseOrderWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmPurchaseOrder.findUnique({
        where,
        ...select,
      })
    },
  },
)
