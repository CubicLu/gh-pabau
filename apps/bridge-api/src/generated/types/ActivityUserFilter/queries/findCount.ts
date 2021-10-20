import { queryField, nonNull, list } from 'nexus'

export const ActivityUserFilterFindCountQuery = queryField(
  'findManyActivityUserFilterCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ActivityUserFilterWhereInput',
      orderBy: list('ActivityUserFilterOrderByWithRelationInput'),
      cursor: 'ActivityUserFilterWhereUniqueInput',
      distinct: 'ActivityUserFilterScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.activityUserFilter.count(args as any)
    },
  },
)
