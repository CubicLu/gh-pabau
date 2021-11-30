import { queryField, nonNull, list } from 'nexus'

export const AccountBalanceLogFindManyQuery = queryField(
  'findManyAccountBalanceLog',
  {
    type: nonNull(list(nonNull('AccountBalanceLog'))),
    args: {
      where: 'AccountBalanceLogWhereInput',
      orderBy: list('AccountBalanceLogOrderByWithRelationInput'),
      cursor: 'AccountBalanceLogWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AccountBalanceLogScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.accountBalanceLog.findMany({
        ...args,
        ...select,
      })
    },
  },
)
