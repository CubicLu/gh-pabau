import { mutationField, nonNull } from 'nexus'

export const SaleItemUpdateOneMutation = mutationField('updateOneSaleItem', {
  type: nonNull('SaleItem'),
  args: {
    where: nonNull('SaleItemWhereUniqueInput'),
    data: nonNull('SaleItemUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.saleItem.update({
      where,
      data,
      ...select,
    })
  },
})
