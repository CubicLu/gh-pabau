import { queryField, list } from 'nexus'

export const UserSalutationAggregateQuery = queryField(
  'aggregateUserSalutation',
  {
    type: 'AggregateUserSalutation',
    args: {
      where: 'UserSalutationWhereInput',
      orderBy: list('UserSalutationOrderByInput'),
      cursor: 'UserSalutationWhereUniqueInput',
      distinct: 'UserSalutationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userSalutation.aggregate({ ...args, ...select }) as any
    },
  },
)
