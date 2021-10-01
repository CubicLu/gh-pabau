import { queryField, list } from 'nexus'

export const ActivityUserFiltersAggregateQuery = queryField(
  'aggregateActivityUserFilters',
  {
    type: 'AggregateActivityUserFilters',
    args: {
      where: 'ActivityUserFiltersWhereInput',
      orderBy: list('ActivityUserFiltersOrderByWithRelationInput'),
      cursor: 'ActivityUserFiltersWhereUniqueInput',
      distinct: 'ActivityUserFiltersScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserFilters.aggregate({ ...args, ...select }) as any
    },
  },
)
