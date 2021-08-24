import { queryField, nonNull, list } from 'nexus'

export const AccountBalanceLogFindCountQuery = queryField(
  'findManyAccountBalanceLogCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AccountBalanceLogWhereInput',
      orderBy: list('AccountBalanceLogOrderByInput'),
      cursor: 'AccountBalanceLogWhereUniqueInput',
      distinct: 'AccountBalanceLogScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.accountBalanceLog.count(args as any)
    },
  },
)
