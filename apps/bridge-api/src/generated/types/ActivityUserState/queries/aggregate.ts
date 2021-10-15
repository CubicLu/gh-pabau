import { queryField, list } from 'nexus'

export const ActivityUserStateAggregateQuery = queryField(
  'aggregateActivityUserState',
  {
    type: 'AggregateActivityUserState',
    args: {
      where: 'ActivityUserStateWhereInput',
      orderBy: list('ActivityUserStateOrderByInput'),
      cursor: 'ActivityUserStateWhereUniqueInput',
      distinct: 'ActivityUserStateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserState.aggregate({ ...args, ...select }) as any
    },
  },
)
