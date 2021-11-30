import { queryField, list } from 'nexus'

export const InvBillerAggregateQuery = queryField('aggregateInvBiller', {
  type: 'AggregateInvBiller',
  args: {
    where: 'InvBillerWhereInput',
    orderBy: list('InvBillerOrderByWithRelationInput'),
    cursor: 'InvBillerWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invBiller.aggregate({ ...args, ...select }) as any
  },
})
