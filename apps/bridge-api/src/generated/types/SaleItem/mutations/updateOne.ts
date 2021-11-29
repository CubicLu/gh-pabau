import { mutationField, nonNull } from 'nexus'

export const SaleItemUpdateOneMutation = mutationField('updateOneSaleItem', {
  type: nonNull('SaleItem'),
  args: {
    data: nonNull('SaleItemUpdateInput'),
    where: nonNull('SaleItemWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.saleItem.update({
      where,
      data,
      ...select,
    })
  },
})
