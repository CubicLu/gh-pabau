import { mutationField, nonNull } from 'nexus'

export const SaleItemDeleteOneMutation = mutationField('deleteOneSaleItem', {
  type: 'SaleItem',
  args: {
    where: nonNull('SaleItemWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.saleItem.delete({
      where,
      ...select,
    })
  },
})
