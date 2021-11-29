import { queryField, nonNull, list } from 'nexus'

export const UserSalutationFindCountQuery = queryField(
  'findManyUserSalutationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'UserSalutationWhereInput',
      orderBy: list('UserSalutationOrderByWithRelationInput'),
      cursor: 'UserSalutationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserSalutationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userSalutation.count(args as any)
    },
  },
)
