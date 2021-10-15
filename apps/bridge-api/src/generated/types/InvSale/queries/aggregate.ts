import { queryField, list } from 'nexus'

export const InvSaleAggregateQuery = queryField('aggregateInvSale', {
  type: 'AggregateInvSale',
  args: {
    where: 'InvSaleWhereInput',
    orderBy: list('InvSaleOrderByInput'),
    cursor: 'InvSaleWhereUniqueInput',
    distinct: 'InvSaleScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invSale.aggregate({ ...args, ...select }) as any
  },
})
