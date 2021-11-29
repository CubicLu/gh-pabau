import { queryField, list } from 'nexus'

export const InvProductAggregateQuery = queryField('aggregateInvProduct', {
  type: 'AggregateInvProduct',
  args: {
    where: 'InvProductWhereInput',
    orderBy: list('InvProductOrderByWithRelationInput'),
    cursor: 'InvProductWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invProduct.aggregate({ ...args, ...select }) as any
  },
})
