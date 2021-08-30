import { queryField, nonNull, list } from 'nexus'

export const AccountBalanceFindManyQuery = queryField(
  'findManyAccountBalance',
  {
    type: nonNull(list(nonNull('AccountBalance'))),
    args: {
      where: 'AccountBalanceWhereInput',
      orderBy: list('AccountBalanceOrderByInput'),
      cursor: 'AccountBalanceWhereUniqueInput',
      distinct: 'AccountBalanceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.accountBalance.findMany({
        ...args,
        ...select,
      })
    },
  },
)
