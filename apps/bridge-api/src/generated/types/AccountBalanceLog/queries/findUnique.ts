import { queryField, nonNull } from 'nexus'

export const AccountBalanceLogFindUniqueQuery = queryField(
  'findUniqueAccountBalanceLog',
  {
    type: 'AccountBalanceLog',
    args: {
      where: nonNull('AccountBalanceLogWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.accountBalanceLog.findUnique({
        where,
        ...select,
      })
    },
  },
)
