import { queryField, nonNull, list } from 'nexus'

export const ActivityUserFiltersFindManyQuery = queryField(
  'findManyActivityUserFilters',
  {
    type: nonNull(list(nonNull('ActivityUserFilters'))),
    args: {
      where: 'ActivityUserFiltersWhereInput',
      orderBy: list('ActivityUserFiltersOrderByWithRelationInput'),
      cursor: 'ActivityUserFiltersWhereUniqueInput',
      distinct: 'ActivityUserFiltersScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserFilters.findMany({
        ...args,
        ...select,
      })
    },
  },
)
