import { queryField, list } from 'nexus'

export const ActivityTypeAggregateQuery = queryField('aggregateActivityType', {
  type: 'AggregateActivityType',
  args: {
    where: 'ActivityTypeWhereInput',
    orderBy: list('ActivityTypeOrderByWithRelationInput'),
    cursor: 'ActivityTypeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.activityType.aggregate({ ...args, ...select }) as any
  },
})
