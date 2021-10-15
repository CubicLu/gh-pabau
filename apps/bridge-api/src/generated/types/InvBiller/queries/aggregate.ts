import { queryField, list } from 'nexus'

export const InvBillerAggregateQuery = queryField('aggregateInvBiller', {
  type: 'AggregateInvBiller',
  args: {
    where: 'InvBillerWhereInput',
    orderBy: list('InvBillerOrderByInput'),
    cursor: 'InvBillerWhereUniqueInput',
    distinct: 'InvBillerScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invBiller.aggregate({ ...args, ...select }) as any
  },
})
