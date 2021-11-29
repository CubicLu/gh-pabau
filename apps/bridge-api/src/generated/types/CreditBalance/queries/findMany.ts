import { queryField, nonNull, list } from 'nexus'

export const CreditBalanceFindManyQuery = queryField('findManyCreditBalance', {
  type: nonNull(list(nonNull('CreditBalance'))),
  args: {
    where: 'CreditBalanceWhereInput',
    orderBy: list('CreditBalanceOrderByWithRelationInput'),
    cursor: 'CreditBalanceWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CreditBalanceScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.creditBalance.findMany({
      ...args,
      ...select,
    })
  },
})
