import { queryField, nonNull, list } from 'nexus'

export const InvSaleFindManyQuery = queryField('findManyInvSale', {
  type: nonNull(list(nonNull('InvSale'))),
  args: {
    where: 'InvSaleWhereInput',
    orderBy: list('InvSaleOrderByInput'),
    cursor: 'InvSaleWhereUniqueInput',
    distinct: 'InvSaleScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invSale.findMany({
      ...args,
      ...select,
    })
  },
})
