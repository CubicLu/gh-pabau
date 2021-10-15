import { queryField, nonNull, list } from 'nexus'

export const CheckinQueueFindManyQuery = queryField('findManyCheckinQueue', {
  type: nonNull(list(nonNull('CheckinQueue'))),
  args: {
    where: 'CheckinQueueWhereInput',
    orderBy: list('CheckinQueueOrderByInput'),
    cursor: 'CheckinQueueWhereUniqueInput',
    distinct: 'CheckinQueueScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.checkinQueue.findMany({
      ...args,
      ...select,
    })
  },
})
