import { queryField, nonNull, list } from 'nexus'

export const AccountBalanceLogFindManyQuery = queryField(
  'findManyAccountBalanceLog',
  {
    type: nonNull(list(nonNull('AccountBalanceLog'))),
    args: {
      where: 'AccountBalanceLogWhereInput',
      orderBy: list('AccountBalanceLogOrderByWithRelationInput'),
      cursor: 'AccountBalanceLogWhereUniqueInput',
      distinct: 'AccountBalanceLogScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.accountBalanceLog.findMany({
        ...args,
        ...select,
      })
    },
  },
)
