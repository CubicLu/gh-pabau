import { queryField, list } from 'nexus'

export const ActivityUserFiltersFindFirstQuery = queryField(
  'findFirstActivityUserFilters',
  {
    type: 'ActivityUserFilters',
    args: {
      where: 'ActivityUserFiltersWhereInput',
      orderBy: list('ActivityUserFiltersOrderByWithRelationInput'),
      cursor: 'ActivityUserFiltersWhereUniqueInput',
      distinct: 'ActivityUserFiltersScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserFilters.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
