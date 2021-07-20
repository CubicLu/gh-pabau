import { queryField, nonNull } from 'nexus'

export const UserSalutationFindUniqueQuery = queryField(
  'findUniqueUserSalutation',
  {
    type: 'UserSalutation',
    args: {
      where: nonNull('UserSalutationWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.userSalutation.findUnique({
        where,
        ...select,
      })
    },
  },
)
