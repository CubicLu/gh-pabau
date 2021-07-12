import { queryField, list } from 'nexus'

export const CheckinQueueFindFirstQuery = queryField('findFirstCheckinQueue', {
  type: 'CheckinQueue',
  args: {
    where: 'CheckinQueueWhereInput',
    orderBy: list('CheckinQueueOrderByInput'),
    cursor: 'CheckinQueueWhereUniqueInput',
    distinct: 'CheckinQueueScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.checkinQueue.findFirst({
      ...args,
      ...select,
    })
  },
})
