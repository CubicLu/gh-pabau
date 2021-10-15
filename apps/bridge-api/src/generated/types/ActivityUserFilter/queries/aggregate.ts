import { queryField, list } from 'nexus'

export const ActivityUserFilterAggregateQuery = queryField(
  'aggregateActivityUserFilter',
  {
    type: 'AggregateActivityUserFilter',
    args: {
      where: 'ActivityUserFilterWhereInput',
      orderBy: list('ActivityUserFilterOrderByInput'),
      cursor: 'ActivityUserFilterWhereUniqueInput',
      distinct: 'ActivityUserFilterScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserFilter.aggregate({ ...args, ...select }) as any
    },
  },
)
