import { queryField, list } from 'nexus'

export const ActivityTypeFindFirstQuery = queryField('findFirstActivityType', {
  type: 'ActivityType',
  args: {
    where: 'ActivityTypeWhereInput',
    orderBy: list('ActivityTypeOrderByInput'),
    cursor: 'ActivityTypeWhereUniqueInput',
    distinct: 'ActivityTypeScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.activityType.findFirst({
      ...args,
      ...select,
    })
  },
})
