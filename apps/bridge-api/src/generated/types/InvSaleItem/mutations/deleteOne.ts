import { mutationField, nonNull } from 'nexus'

export const InvSaleItemDeleteOneMutation = mutationField(
  'deleteOneInvSaleItem',
  {
    type: 'InvSaleItem',
    args: {
      where: nonNull('InvSaleItemWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.invSaleItem.delete({
        where,
        ...select,
      })
    },
  },
)
