import { mutationField, nonNull } from 'nexus'

export const InvSaleDeleteOneMutation = mutationField('deleteOneInvSale', {
  type: 'InvSale',
  args: {
    where: nonNull('InvSaleWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.invSale.delete({
      where,
      ...select,
    })
  },
})
