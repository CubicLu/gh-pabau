import { queryField, list } from 'nexus'

export const AccountBalanceLogFindFirstQuery = queryField(
  'findFirstAccountBalanceLog',
  {
    type: 'AccountBalanceLog',
    args: {
      where: 'AccountBalanceLogWhereInput',
      orderBy: list('AccountBalanceLogOrderByWithRelationInput'),
      cursor: 'AccountBalanceLogWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AccountBalanceLogScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.accountBalanceLog.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
