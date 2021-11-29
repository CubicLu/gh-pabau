import { mutationField, nonNull } from 'nexus'

export const InvSaleUpdateOneMutation = mutationField('updateOneInvSale', {
  type: nonNull('InvSale'),
  args: {
    data: nonNull('InvSaleUpdateInput'),
    where: nonNull('InvSaleWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.invSale.update({
      where,
      data,
      ...select,
    })
  },
})
