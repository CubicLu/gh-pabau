import { queryField, list } from 'nexus'

export const ActivityUserFilterAggregateQuery = queryField(
  'aggregateActivityUserFilter',
  {
    type: 'AggregateActivityUserFilter',
    args: {
      where: 'ActivityUserFilterWhereInput',
      orderBy: list('ActivityUserFilterOrderByWithRelationInput'),
      cursor: 'ActivityUserFilterWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserFilter.aggregate({ ...args, ...select }) as any
    },
  },
)
