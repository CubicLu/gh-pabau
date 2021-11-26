import { queryField, list } from 'nexus'

export const CreditBalanceFindFirstQuery = queryField(
  'findFirstCreditBalance',
  {
    type: 'CreditBalance',
    args: {
      where: 'CreditBalanceWhereInput',
      orderBy: list('CreditBalanceOrderByWithRelationInput'),
      cursor: 'CreditBalanceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CreditBalanceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.creditBalance.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
