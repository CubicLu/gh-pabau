import { queryField, list } from 'nexus'

export const InvSaleFindFirstQuery = queryField('findFirstInvSale', {
  type: 'InvSale',
  args: {
    where: 'InvSaleWhereInput',
    orderBy: list('InvSaleOrderByWithRelationInput'),
    cursor: 'InvSaleWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('InvSaleScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invSale.findFirst({
      ...args,
      ...select,
    })
  },
})
