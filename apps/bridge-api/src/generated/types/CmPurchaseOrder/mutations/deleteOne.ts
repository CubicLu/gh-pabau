import { mutationField, nonNull } from 'nexus'

export const CmPurchaseOrderDeleteOneMutation = mutationField(
  'deleteOneCmPurchaseOrder',
  {
    type: 'CmPurchaseOrder',
    args: {
      where: nonNull('CmPurchaseOrderWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmPurchaseOrder.delete({
        where,
        ...select,
      })
    },
  },
)
