import { queryField, nonNull, list } from 'nexus'

export const TwoFactorHistoryFindManyQuery = queryField(
  'findManyTwoFactorHistory',
  {
    type: nonNull(list(nonNull('TwoFactorHistory'))),
    args: {
      where: 'TwoFactorHistoryWhereInput',
      orderBy: list('TwoFactorHistoryOrderByWithRelationInput'),
      cursor: 'TwoFactorHistoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('TwoFactorHistoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.twoFactorHistory.findMany({
        ...args,
        ...select,
      })
    },
  },
)
