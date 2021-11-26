import { queryField, list } from 'nexus'

export const UserActivityLogAggregateQuery = queryField(
  'aggregateUserActivityLog',
  {
    type: 'AggregateUserActivityLog',
    args: {
      where: 'UserActivityLogWhereInput',
      orderBy: list('UserActivityLogOrderByWithRelationInput'),
      cursor: 'UserActivityLogWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userActivityLog.aggregate({ ...args, ...select }) as any
    },
  },
)
