import { queryField, list } from 'nexus'

export const AccountBalanceLogFindFirstQuery = queryField(
  'findFirstAccountBalanceLog',
  {
    type: 'AccountBalanceLog',
    args: {
      where: 'AccountBalanceLogWhereInput',
      orderBy: list('AccountBalanceLogOrderByWithRelationInput'),
      cursor: 'AccountBalanceLogWhereUniqueInput',
      distinct: 'AccountBalanceLogScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.accountBalanceLog.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
