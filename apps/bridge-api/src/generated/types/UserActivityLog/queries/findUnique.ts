import { queryField, nonNull } from 'nexus'

export const UserActivityLogFindUniqueQuery = queryField(
  'findUniqueUserActivityLog',
  {
    type: 'UserActivityLog',
    args: {
      where: nonNull('UserActivityLogWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.userActivityLog.findUnique({
        where,
        ...select,
      })
    },
  },
)
