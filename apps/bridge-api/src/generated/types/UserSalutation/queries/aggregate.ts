import { queryField, list } from 'nexus'

export const UserSalutationAggregateQuery = queryField(
  'aggregateUserSalutation',
  {
    type: 'AggregateUserSalutation',
    args: {
      where: 'UserSalutationWhereInput',
      orderBy: list('UserSalutationOrderByWithRelationInput'),
      cursor: 'UserSalutationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userSalutation.aggregate({ ...args, ...select }) as any
    },
  },
)
