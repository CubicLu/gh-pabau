import { queryField, list } from 'nexus'

export const UserActivityLogFindFirstQuery = queryField(
  'findFirstUserActivityLog',
  {
    type: 'UserActivityLog',
    args: {
      where: 'UserActivityLogWhereInput',
      orderBy: list('UserActivityLogOrderByInput'),
      cursor: 'UserActivityLogWhereUniqueInput',
      distinct: 'UserActivityLogScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userActivityLog.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
