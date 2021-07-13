import { queryField, list } from 'nexus'

export const UserSalutationFindFirstQuery = queryField(
  'findFirstUserSalutation',
  {
    type: 'UserSalutation',
    args: {
      where: 'UserSalutationWhereInput',
      orderBy: list('UserSalutationOrderByInput'),
      cursor: 'UserSalutationWhereUniqueInput',
      distinct: 'UserSalutationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userSalutation.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
