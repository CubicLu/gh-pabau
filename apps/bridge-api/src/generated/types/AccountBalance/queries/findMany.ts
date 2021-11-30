import { queryField, nonNull, list } from 'nexus'

export const AccountBalanceFindManyQuery = queryField(
  'findManyAccountBalance',
  {
    type: nonNull(list(nonNull('AccountBalance'))),
    args: {
      where: 'AccountBalanceWhereInput',
      orderBy: list('AccountBalanceOrderByWithRelationInput'),
      cursor: 'AccountBalanceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AccountBalanceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.accountBalance.findMany({
        ...args,
        ...select,
      })
    },
  },
)
