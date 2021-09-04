import { queryField, nonNull } from 'nexus'

export const ActivityTypeFindUniqueQuery = queryField(
  'findUniqueActivityType',
  {
    type: 'ActivityType',
    args: {
      where: nonNull('ActivityTypeWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.activityType.findUnique({
        where,
        ...select,
      })
    },
  },
)
