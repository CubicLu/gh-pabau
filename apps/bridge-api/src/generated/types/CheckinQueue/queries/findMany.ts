import { queryField, nonNull, list } from 'nexus'

export const CheckinQueueFindManyQuery = queryField('findManyCheckinQueue', {
  type: nonNull(list(nonNull('CheckinQueue'))),
  args: {
    where: 'CheckinQueueWhereInput',
    orderBy: list('CheckinQueueOrderByWithRelationInput'),
    cursor: 'CheckinQueueWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CheckinQueueScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.checkinQueue.findMany({
      ...args,
      ...select,
    })
  },
})
