import { queryField, nonNull, list } from 'nexus'

export const CreditBalanceFindCountQuery = queryField(
  'findManyCreditBalanceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CreditBalanceWhereInput',
      orderBy: list('CreditBalanceOrderByWithRelationInput'),
      cursor: 'CreditBalanceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CreditBalanceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.creditBalance.count(args as any)
    },
  },
)
