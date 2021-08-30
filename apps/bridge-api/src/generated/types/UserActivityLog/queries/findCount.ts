import { queryField, nonNull, list } from 'nexus'

export const UserActivityLogFindCountQuery = queryField(
  'findManyUserActivityLogCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'UserActivityLogWhereInput',
      orderBy: list('UserActivityLogOrderByWithRelationInput'),
      cursor: 'UserActivityLogWhereUniqueInput',
      distinct: 'UserActivityLogScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userActivityLog.count(args as any)
    },
  },
)
