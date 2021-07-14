import { mutationField, nonNull } from 'nexus'

export const CmPurchaseItemDeleteOneMutation = mutationField(
  'deleteOneCmPurchaseItem',
  {
    type: 'CmPurchaseItem',
    args: {
      where: nonNull('CmPurchaseItemWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmPurchaseItem.delete({
        where,
        ...select,
      })
    },
  },
)
