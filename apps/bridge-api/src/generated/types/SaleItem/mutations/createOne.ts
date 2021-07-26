import { mutationField, nonNull } from 'nexus'

export const SaleItemCreateOneMutation = mutationField('createOneSaleItem', {
  type: nonNull('SaleItem'),
  args: {
    data: nonNull('SaleItemCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.saleItem.create({
      data,
      ...select,
    })
  },
})
