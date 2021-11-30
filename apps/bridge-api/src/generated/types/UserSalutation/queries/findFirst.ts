import { queryField, list } from 'nexus'

export const UserSalutationFindFirstQuery = queryField(
  'findFirstUserSalutation',
  {
    type: 'UserSalutation',
    args: {
      where: 'UserSalutationWhereInput',
      orderBy: list('UserSalutationOrderByWithRelationInput'),
      cursor: 'UserSalutationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserSalutationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userSalutation.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
