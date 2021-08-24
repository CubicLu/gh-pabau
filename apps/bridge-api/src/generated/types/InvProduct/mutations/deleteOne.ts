import { mutationField, nonNull } from 'nexus'

export const InvProductDeleteOneMutation = mutationField(
  'deleteOneInvProduct',
  {
    type: 'InvProduct',
    args: {
      where: nonNull('InvProductWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.invProduct.delete({
        where,
        ...select,
      })
    },
  },
)
