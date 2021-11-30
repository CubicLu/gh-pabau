import { queryField, nonNull, list } from 'nexus'

export const AccountBalanceLogFindCountQuery = queryField(
  'findManyAccountBalanceLogCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AccountBalanceLogWhereInput',
      orderBy: list('AccountBalanceLogOrderByWithRelationInput'),
      cursor: 'AccountBalanceLogWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AccountBalanceLogScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.accountBalanceLog.count(args as any)
    },
  },
)
