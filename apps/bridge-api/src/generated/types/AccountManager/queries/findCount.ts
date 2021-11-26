import { queryField, nonNull, list } from 'nexus'

export const AccountManagerFindCountQuery = queryField(
  'findManyAccountManagerCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AccountManagerWhereInput',
      orderBy: list('AccountManagerOrderByWithRelationInput'),
      cursor: 'AccountManagerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AccountManagerScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.accountManager.count(args as any)
    },
  },
)
