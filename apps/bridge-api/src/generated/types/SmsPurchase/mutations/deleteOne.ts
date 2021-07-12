import { mutationField, nonNull } from 'nexus'

export const SmsPurchaseDeleteOneMutation = mutationField(
  'deleteOneSmsPurchase',
  {
    type: 'SmsPurchase',
    args: {
      where: nonNull('SmsPurchaseWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.smsPurchase.delete({
        where,
        ...select,
      })
    },
  },
)
