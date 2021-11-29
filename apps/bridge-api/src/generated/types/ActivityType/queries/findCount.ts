import { queryField, nonNull, list } from 'nexus'

export const ActivityTypeFindCountQuery = queryField(
  'findManyActivityTypeCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ActivityTypeWhereInput',
      orderBy: list('ActivityTypeOrderByWithRelationInput'),
      cursor: 'ActivityTypeWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ActivityTypeScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.activityType.count(args as any)
    },
  },
)
