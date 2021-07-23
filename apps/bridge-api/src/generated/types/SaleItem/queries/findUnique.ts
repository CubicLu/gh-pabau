import { queryField, nonNull } from 'nexus'

export const SaleItemFindUniqueQuery = queryField('findUniqueSaleItem', {
  type: 'SaleItem',
  args: {
    where: nonNull('SaleItemWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.saleItem.findUnique({
      where,
      ...select,
    })
  },
})
