import { queryField, nonNull } from 'nexus'

export const CreditBalanceFindUniqueQuery = queryField(
  'findUniqueCreditBalance',
  {
    type: 'CreditBalance',
    args: {
      where: nonNull('CreditBalanceWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.creditBalance.findUnique({
        where,
        ...select,
      })
    },
  },
)
