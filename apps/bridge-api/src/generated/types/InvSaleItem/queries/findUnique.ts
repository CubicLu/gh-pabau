import { queryField, nonNull } from 'nexus'

export const InvSaleItemFindUniqueQuery = queryField('findUniqueInvSaleItem', {
  type: 'InvSaleItem',
  args: {
    where: nonNull('InvSaleItemWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.invSaleItem.findUnique({
      where,
      ...select,
    })
  },
})
