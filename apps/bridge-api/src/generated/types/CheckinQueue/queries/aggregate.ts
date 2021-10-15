import { queryField, list } from 'nexus'

export const CheckinQueueAggregateQuery = queryField('aggregateCheckinQueue', {
  type: 'AggregateCheckinQueue',
  args: {
    where: 'CheckinQueueWhereInput',
    orderBy: list('CheckinQueueOrderByInput'),
    cursor: 'CheckinQueueWhereUniqueInput',
    distinct: 'CheckinQueueScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.checkinQueue.aggregate({ ...args, ...select }) as any
  },
})
