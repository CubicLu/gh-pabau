import { queryField, nonNull, list } from 'nexus'

export const TwoFactorHistoryFindCountQuery = queryField(
  'findManyTwoFactorHistoryCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'TwoFactorHistoryWhereInput',
      orderBy: list('TwoFactorHistoryOrderByInput'),
      cursor: 'TwoFactorHistoryWhereUniqueInput',
      distinct: 'TwoFactorHistoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.twoFactorHistory.count(args as any)
    },
  },
)
