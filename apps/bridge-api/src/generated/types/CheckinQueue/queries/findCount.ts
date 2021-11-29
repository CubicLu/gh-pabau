import { queryField, nonNull, list } from 'nexus'

export const CheckinQueueFindCountQuery = queryField(
  'findManyCheckinQueueCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CheckinQueueWhereInput',
      orderBy: list('CheckinQueueOrderByWithRelationInput'),
      cursor: 'CheckinQueueWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CheckinQueueScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.checkinQueue.count(args as any)
    },
  },
)
