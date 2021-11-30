import { queryField, nonNull, list } from 'nexus'

export const ActivityTypeFindManyQuery = queryField('findManyActivityType', {
  type: nonNull(list(nonNull('ActivityType'))),
  args: {
    where: 'ActivityTypeWhereInput',
    orderBy: list('ActivityTypeOrderByWithRelationInput'),
    cursor: 'ActivityTypeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ActivityTypeScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.activityType.findMany({
      ...args,
      ...select,
    })
  },
})
