import { queryField, list } from 'nexus'

export const InvSaleFindFirstQuery = queryField('findFirstInvSale', {
  type: 'InvSale',
  args: {
    where: 'InvSaleWhereInput',
    orderBy: list('InvSaleOrderByInput'),
    cursor: 'InvSaleWhereUniqueInput',
    distinct: 'InvSaleScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invSale.findFirst({
      ...args,
      ...select,
    })
  },
})
