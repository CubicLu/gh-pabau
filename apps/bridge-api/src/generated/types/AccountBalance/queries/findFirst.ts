import { queryField, list } from 'nexus'

export const AccountBalanceFindFirstQuery = queryField(
  'findFirstAccountBalance',
  {
    type: 'AccountBalance',
    args: {
      where: 'AccountBalanceWhereInput',
      orderBy: list('AccountBalanceOrderByWithRelationInput'),
      cursor: 'AccountBalanceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AccountBalanceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.accountBalance.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
