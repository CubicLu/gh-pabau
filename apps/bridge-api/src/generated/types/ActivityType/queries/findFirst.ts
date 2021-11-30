import { queryField, list } from 'nexus'

export const ActivityTypeFindFirstQuery = queryField('findFirstActivityType', {
  type: 'ActivityType',
  args: {
    where: 'ActivityTypeWhereInput',
    orderBy: list('ActivityTypeOrderByWithRelationInput'),
    cursor: 'ActivityTypeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ActivityTypeScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.activityType.findFirst({
      ...args,
      ...select,
    })
  },
})
