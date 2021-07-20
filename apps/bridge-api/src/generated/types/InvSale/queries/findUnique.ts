import { queryField, nonNull } from 'nexus'

export const InvSaleFindUniqueQuery = queryField('findUniqueInvSale', {
  type: 'InvSale',
  args: {
    where: nonNull('InvSaleWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.invSale.findUnique({
      where,
      ...select,
    })
  },
})
