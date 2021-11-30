import { queryField, nonNull, list } from 'nexus'

export const InvSaleFindCountQuery = queryField('findManyInvSaleCount', {
  type: nonNull('Int'),
  args: {
    where: 'InvSaleWhereInput',
    orderBy: list('InvSaleOrderByWithRelationInput'),
    cursor: 'InvSaleWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('InvSaleScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.invSale.count(args as any)
  },
})
