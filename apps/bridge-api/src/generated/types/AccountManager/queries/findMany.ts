import { queryField, nonNull, list } from 'nexus'

export const AccountManagerFindManyQuery = queryField(
  'findManyAccountManager',
  {
    type: nonNull(list(nonNull('AccountManager'))),
    args: {
      where: 'AccountManagerWhereInput',
      orderBy: list('AccountManagerOrderByInput'),
      cursor: 'AccountManagerWhereUniqueInput',
      distinct: 'AccountManagerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.accountManager.findMany({
        ...args,
        ...select,
      })
    },
  },
)
