import { queryField, list } from 'nexus'

export const AccountBalanceLogAggregateQuery = queryField(
  'aggregateAccountBalanceLog',
  {
    type: 'AggregateAccountBalanceLog',
    args: {
      where: 'AccountBalanceLogWhereInput',
      orderBy: list('AccountBalanceLogOrderByInput'),
      cursor: 'AccountBalanceLogWhereUniqueInput',
      distinct: 'AccountBalanceLogScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.accountBalanceLog.aggregate({ ...args, ...select }) as any
    },
  },
)
