import { queryField, list } from 'nexus'

export const TwoFactorHistoryFindFirstQuery = queryField(
  'findFirstTwoFactorHistory',
  {
    type: 'TwoFactorHistory',
    args: {
      where: 'TwoFactorHistoryWhereInput',
      orderBy: list('TwoFactorHistoryOrderByWithRelationInput'),
      cursor: 'TwoFactorHistoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('TwoFactorHistoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.twoFactorHistory.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
