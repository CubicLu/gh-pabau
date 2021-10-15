import { queryField, list } from 'nexus'

export const ActivityAggregateQuery = queryField('aggregateActivity', {
  type: 'AggregateActivity',
  args: {
    where: 'ActivityWhereInput',
    orderBy: list('ActivityOrderByInput'),
    cursor: 'ActivityWhereUniqueInput',
    distinct: 'ActivityScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.activity.aggregate({ ...args, ...select }) as any
  },
})
