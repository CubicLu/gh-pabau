import { queryField, nonNull, list } from 'nexus'

export const CreditBalanceFindManyQuery = queryField('findManyCreditBalance', {
  type: nonNull(list(nonNull('CreditBalance'))),
  args: {
    where: 'CreditBalanceWhereInput',
    orderBy: list('CreditBalanceOrderByWithRelationInput'),
    cursor: 'CreditBalanceWhereUniqueInput',
    distinct: 'CreditBalanceScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.creditBalance.findMany({
      ...args,
      ...select,
    })
  },
})
