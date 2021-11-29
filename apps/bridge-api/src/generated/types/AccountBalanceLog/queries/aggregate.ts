import { queryField, list } from 'nexus'

export const AccountBalanceLogAggregateQuery = queryField(
  'aggregateAccountBalanceLog',
  {
    type: 'AggregateAccountBalanceLog',
    args: {
      where: 'AccountBalanceLogWhereInput',
      orderBy: list('AccountBalanceLogOrderByWithRelationInput'),
      cursor: 'AccountBalanceLogWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.accountBalanceLog.aggregate({ ...args, ...select }) as any
    },
  },
)
