import { queryField, nonNull, list } from 'nexus'

export const UserSalutationFindManyQuery = queryField(
  'findManyUserSalutation',
  {
    type: nonNull(list(nonNull('UserSalutation'))),
    args: {
      where: 'UserSalutationWhereInput',
      orderBy: list('UserSalutationOrderByWithRelationInput'),
      cursor: 'UserSalutationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserSalutationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userSalutation.findMany({
        ...args,
        ...select,
      })
    },
  },
)
