import { queryField, list } from 'nexus'

export const InvSaleItemAggregateQuery = queryField('aggregateInvSaleItem', {
  type: 'AggregateInvSaleItem',
  args: {
    where: 'InvSaleItemWhereInput',
    orderBy: list('InvSaleItemOrderByInput'),
    cursor: 'InvSaleItemWhereUniqueInput',
    distinct: 'InvSaleItemScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invSaleItem.aggregate({ ...args, ...select }) as any
  },
})
