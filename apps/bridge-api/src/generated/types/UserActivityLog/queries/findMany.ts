import { queryField, nonNull, list } from 'nexus'

export const UserActivityLogFindManyQuery = queryField(
  'findManyUserActivityLog',
  {
    type: nonNull(list(nonNull('UserActivityLog'))),
    args: {
      where: 'UserActivityLogWhereInput',
      orderBy: list('UserActivityLogOrderByWithRelationInput'),
      cursor: 'UserActivityLogWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserActivityLogScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userActivityLog.findMany({
        ...args,
        ...select,
      })
    },
  },
)
