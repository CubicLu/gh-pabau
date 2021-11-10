import { queryField, nonNull, list } from 'nexus'

export const CreditBalanceFindCountQuery = queryField(
  'findManyCreditBalanceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CreditBalanceWhereInput',
      orderBy: list('CreditBalanceOrderByWithRelationInput'),
      cursor: 'CreditBalanceWhereUniqueInput',
      distinct: 'CreditBalanceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.creditBalance.count(args as any)
    },
  },
)
