import { queryField, nonNull, list } from 'nexus'

export const TwoFactorHistoryFindCountQuery = queryField(
  'findManyTwoFactorHistoryCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'TwoFactorHistoryWhereInput',
      orderBy: list('TwoFactorHistoryOrderByWithRelationInput'),
      cursor: 'TwoFactorHistoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('TwoFactorHistoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.twoFactorHistory.count(args as any)
    },
  },
)
