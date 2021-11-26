import { queryField, nonNull, list } from 'nexus'

export const AccountManagerFindManyQuery = queryField(
  'findManyAccountManager',
  {
    type: nonNull(list(nonNull('AccountManager'))),
    args: {
      where: 'AccountManagerWhereInput',
      orderBy: list('AccountManagerOrderByWithRelationInput'),
      cursor: 'AccountManagerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AccountManagerScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.accountManager.findMany({
        ...args,
        ...select,
      })
    },
  },
)
