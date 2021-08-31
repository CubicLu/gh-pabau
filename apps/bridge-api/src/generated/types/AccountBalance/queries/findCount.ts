import { queryField, nonNull, list } from 'nexus'

export const AccountBalanceFindCountQuery = queryField(
  'findManyAccountBalanceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AccountBalanceWhereInput',
      orderBy: list('AccountBalanceOrderByWithRelationInput'),
      cursor: 'AccountBalanceWhereUniqueInput',
      distinct: 'AccountBalanceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.accountBalance.count(args as any)
    },
  },
)
