import { queryField, list } from 'nexus'

export const AccountManagerFindFirstQuery = queryField(
  'findFirstAccountManager',
  {
    type: 'AccountManager',
    args: {
      where: 'AccountManagerWhereInput',
      orderBy: list('AccountManagerOrderByWithRelationInput'),
      cursor: 'AccountManagerWhereUniqueInput',
      distinct: 'AccountManagerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.accountManager.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
