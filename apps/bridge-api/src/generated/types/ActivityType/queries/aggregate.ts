import { queryField, list } from 'nexus'

export const ActivityTypeAggregateQuery = queryField('aggregateActivityType', {
  type: 'AggregateActivityType',
  args: {
    where: 'ActivityTypeWhereInput',
    orderBy: list('ActivityTypeOrderByWithRelationInput'),
    cursor: 'ActivityTypeWhereUniqueInput',
    distinct: 'ActivityTypeScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.activityType.aggregate({ ...args, ...select }) as any
  },
})
