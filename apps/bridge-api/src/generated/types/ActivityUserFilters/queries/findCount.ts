import { queryField, nonNull, list } from 'nexus'

export const ActivityUserFiltersFindCountQuery = queryField(
  'findManyActivityUserFiltersCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ActivityUserFiltersWhereInput',
      orderBy: list('ActivityUserFiltersOrderByWithRelationInput'),
      cursor: 'ActivityUserFiltersWhereUniqueInput',
      distinct: 'ActivityUserFiltersScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.activityUserFilters.count(args as any)
    },
  },
)
