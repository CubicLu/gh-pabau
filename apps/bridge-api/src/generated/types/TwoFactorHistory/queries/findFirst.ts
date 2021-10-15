import { queryField, list } from 'nexus'

export const TwoFactorHistoryFindFirstQuery = queryField(
  'findFirstTwoFactorHistory',
  {
    type: 'TwoFactorHistory',
    args: {
      where: 'TwoFactorHistoryWhereInput',
      orderBy: list('TwoFactorHistoryOrderByInput'),
      cursor: 'TwoFactorHistoryWhereUniqueInput',
      distinct: 'TwoFactorHistoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.twoFactorHistory.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
