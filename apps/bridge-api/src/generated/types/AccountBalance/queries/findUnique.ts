import { queryField, nonNull } from 'nexus'

export const AccountBalanceFindUniqueQuery = queryField(
  'findUniqueAccountBalance',
  {
    type: 'AccountBalance',
    args: {
      where: nonNull('AccountBalanceWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.accountBalance.findUnique({
        where,
        ...select,
      })
    },
  },
)
