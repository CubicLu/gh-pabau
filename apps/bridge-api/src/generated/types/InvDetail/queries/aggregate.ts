import { queryField, list } from 'nexus'

export const InvDetailAggregateQuery = queryField('aggregateInvDetail', {
  type: 'AggregateInvDetail',
  args: {
    where: 'InvDetailWhereInput',
    orderBy: list('InvDetailOrderByWithRelationInput'),
    cursor: 'InvDetailWhereUniqueInput',
    distinct: 'InvDetailScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invDetail.aggregate({ ...args, ...select }) as any
  },
})
