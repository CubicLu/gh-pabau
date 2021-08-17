import { mutationField, nonNull } from 'nexus'

export const InvSaleUpdateOneMutation = mutationField('updateOneInvSale', {
  type: nonNull('InvSale'),
  args: {
    where: nonNull('InvSaleWhereUniqueInput'),
    data: nonNull('InvSaleUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.invSale.update({
      where,
      data,
      ...select,
    })
  },
})
