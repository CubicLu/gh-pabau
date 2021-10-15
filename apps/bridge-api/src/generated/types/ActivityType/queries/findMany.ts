import { queryField, nonNull, list } from 'nexus'

export const ActivityTypeFindManyQuery = queryField('findManyActivityType', {
  type: nonNull(list(nonNull('ActivityType'))),
  args: {
    where: 'ActivityTypeWhereInput',
    orderBy: list('ActivityTypeOrderByInput'),
    cursor: 'ActivityTypeWhereUniqueInput',
    distinct: 'ActivityTypeScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.activityType.findMany({
      ...args,
      ...select,
    })
  },
})
