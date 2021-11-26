import { queryField, list } from 'nexus'

export const UserActivityLogFindFirstQuery = queryField(
  'findFirstUserActivityLog',
  {
    type: 'UserActivityLog',
    args: {
      where: 'UserActivityLogWhereInput',
      orderBy: list('UserActivityLogOrderByWithRelationInput'),
      cursor: 'UserActivityLogWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserActivityLogScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userActivityLog.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
