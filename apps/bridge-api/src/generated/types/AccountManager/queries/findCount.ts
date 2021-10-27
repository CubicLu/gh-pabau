import { queryField, nonNull, list } from 'nexus'

export const AccountManagerFindCountQuery = queryField(
  'findManyAccountManagerCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AccountManagerWhereInput',
      orderBy: list('AccountManagerOrderByWithRelationInput'),
      cursor: 'AccountManagerWhereUniqueInput',
      distinct: 'AccountManagerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.accountManager.count(args as any)
    },
  },
)
