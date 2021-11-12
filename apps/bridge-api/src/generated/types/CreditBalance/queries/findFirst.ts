import { queryField, list } from 'nexus'

export const CreditBalanceFindFirstQuery = queryField(
  'findFirstCreditBalance',
  {
    type: 'CreditBalance',
    args: {
      where: 'CreditBalanceWhereInput',
      orderBy: list('CreditBalanceOrderByWithRelationInput'),
      cursor: 'CreditBalanceWhereUniqueInput',
      distinct: 'CreditBalanceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.creditBalance.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
