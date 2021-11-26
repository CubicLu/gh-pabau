import { queryField, list } from 'nexus'

export const ActivityAggregateQuery = queryField('aggregateActivity', {
  type: 'AggregateActivity',
  args: {
    where: 'ActivityWhereInput',
    orderBy: list('ActivityOrderByWithRelationInput'),
    cursor: 'ActivityWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.activity.aggregate({ ...args, ...select }) as any
  },
})
