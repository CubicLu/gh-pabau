import { mutationField, nonNull } from 'nexus'

export const InvSaleItemUpdateOneMutation = mutationField(
  'updateOneInvSaleItem',
  {
    type: nonNull('InvSaleItem'),
    args: {
      where: nonNull('InvSaleItemWhereUniqueInput'),
      data: nonNull('InvSaleItemUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.invSaleItem.update({
        where,
        data,
        ...select,
      })
    },
  },
)
