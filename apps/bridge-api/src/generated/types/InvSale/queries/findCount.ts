import { queryField, nonNull, list } from 'nexus'

export const InvSaleFindCountQuery = queryField('findManyInvSaleCount', {
  type: nonNull('Int'),
  args: {
    where: 'InvSaleWhereInput',
    orderBy: list('InvSaleOrderByInput'),
    cursor: 'InvSaleWhereUniqueInput',
    distinct: 'InvSaleScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.invSale.count(args as any)
  },
})
