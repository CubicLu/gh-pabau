import { queryField, list } from 'nexus'

export const AccountBalanceAggregateQuery = queryField(
  'aggregateAccountBalance',
  {
    type: 'AggregateAccountBalance',
    args: {
      where: 'AccountBalanceWhereInput',
      orderBy: list('AccountBalanceOrderByWithRelationInput'),
      cursor: 'AccountBalanceWhereUniqueInput',
      distinct: 'AccountBalanceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.accountBalance.aggregate({ ...args, ...select }) as any
    },
  },
)
