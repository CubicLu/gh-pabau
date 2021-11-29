import { queryField, nonNull, list } from 'nexus'

export const AccountBalanceFindCountQuery = queryField(
  'findManyAccountBalanceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AccountBalanceWhereInput',
      orderBy: list('AccountBalanceOrderByWithRelationInput'),
      cursor: 'AccountBalanceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AccountBalanceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.accountBalance.count(args as any)
    },
  },
)
