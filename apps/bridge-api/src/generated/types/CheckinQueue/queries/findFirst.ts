import { queryField, list } from 'nexus'

export const CheckinQueueFindFirstQuery = queryField('findFirstCheckinQueue', {
  type: 'CheckinQueue',
  args: {
    where: 'CheckinQueueWhereInput',
    orderBy: list('CheckinQueueOrderByWithRelationInput'),
    cursor: 'CheckinQueueWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CheckinQueueScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.checkinQueue.findFirst({
      ...args,
      ...select,
    })
  },
})
