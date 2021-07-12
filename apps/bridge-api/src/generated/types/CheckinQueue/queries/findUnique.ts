import { queryField, nonNull } from 'nexus'

export const CheckinQueueFindUniqueQuery = queryField(
  'findUniqueCheckinQueue',
  {
    type: 'CheckinQueue',
    args: {
      where: nonNull('CheckinQueueWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.checkinQueue.findUnique({
        where,
        ...select,
      })
    },
  },
)
