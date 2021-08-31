import { queryField, nonNull, list } from 'nexus'

export const UserSalutationFindCountQuery = queryField(
  'findManyUserSalutationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'UserSalutationWhereInput',
      orderBy: list('UserSalutationOrderByWithRelationInput'),
      cursor: 'UserSalutationWhereUniqueInput',
      distinct: 'UserSalutationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userSalutation.count(args as any)
    },
  },
)
