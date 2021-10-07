import { queryField, nonNull, list } from 'nexus'

export const TwoFactorHistoryFindManyQuery = queryField(
  'findManyTwoFactorHistory',
  {
    type: nonNull(list(nonNull('TwoFactorHistory'))),
    args: {
      where: 'TwoFactorHistoryWhereInput',
      orderBy: list('TwoFactorHistoryOrderByWithRelationInput'),
      cursor: 'TwoFactorHistoryWhereUniqueInput',
      distinct: 'TwoFactorHistoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.twoFactorHistory.findMany({
        ...args,
        ...select,
      })
    },
  },
)
