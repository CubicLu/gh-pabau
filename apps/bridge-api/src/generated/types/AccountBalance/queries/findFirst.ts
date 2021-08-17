import { queryField, list } from 'nexus'

export const AccountBalanceFindFirstQuery = queryField(
  'findFirstAccountBalance',
  {
    type: 'AccountBalance',
    args: {
      where: 'AccountBalanceWhereInput',
      orderBy: list('AccountBalanceOrderByInput'),
      cursor: 'AccountBalanceWhereUniqueInput',
      distinct: 'AccountBalanceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.accountBalance.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
