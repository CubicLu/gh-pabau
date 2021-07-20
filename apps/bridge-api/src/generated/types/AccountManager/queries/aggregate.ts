import { queryField, list } from 'nexus'

export const AccountManagerAggregateQuery = queryField(
  'aggregateAccountManager',
  {
    type: 'AggregateAccountManager',
    args: {
      where: 'AccountManagerWhereInput',
      orderBy: list('AccountManagerOrderByInput'),
      cursor: 'AccountManagerWhereUniqueInput',
      distinct: 'AccountManagerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.accountManager.aggregate({ ...args, ...select }) as any
    },
  },
)
