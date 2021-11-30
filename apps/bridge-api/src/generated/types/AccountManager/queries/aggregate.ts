import { queryField, list } from 'nexus'

export const AccountManagerAggregateQuery = queryField(
  'aggregateAccountManager',
  {
    type: 'AggregateAccountManager',
    args: {
      where: 'AccountManagerWhereInput',
      orderBy: list('AccountManagerOrderByWithRelationInput'),
      cursor: 'AccountManagerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.accountManager.aggregate({ ...args, ...select }) as any
    },
  },
)
