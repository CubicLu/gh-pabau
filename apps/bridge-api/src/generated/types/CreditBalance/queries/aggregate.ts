import { queryField, list } from 'nexus'

export const CreditBalanceAggregateQuery = queryField(
  'aggregateCreditBalance',
  {
    type: 'AggregateCreditBalance',
    args: {
      where: 'CreditBalanceWhereInput',
      orderBy: list('CreditBalanceOrderByWithRelationInput'),
      cursor: 'CreditBalanceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.creditBalance.aggregate({ ...args, ...select }) as any
    },
  },
)
