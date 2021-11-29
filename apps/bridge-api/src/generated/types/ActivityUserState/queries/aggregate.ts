import { queryField, list } from 'nexus'

export const ActivityUserStateAggregateQuery = queryField(
  'aggregateActivityUserState',
  {
    type: 'AggregateActivityUserState',
    args: {
      where: 'ActivityUserStateWhereInput',
      orderBy: list('ActivityUserStateOrderByWithRelationInput'),
      cursor: 'ActivityUserStateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserState.aggregate({ ...args, ...select }) as any
    },
  },
)
