import { queryField, list } from 'nexus'

export const TwoFactorHistoryAggregateQuery = queryField(
  'aggregateTwoFactorHistory',
  {
    type: 'AggregateTwoFactorHistory',
    args: {
      where: 'TwoFactorHistoryWhereInput',
      orderBy: list('TwoFactorHistoryOrderByInput'),
      cursor: 'TwoFactorHistoryWhereUniqueInput',
      distinct: 'TwoFactorHistoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.twoFactorHistory.aggregate({ ...args, ...select }) as any
    },
  },
)
