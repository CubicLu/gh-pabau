import { mutationField, nonNull } from 'nexus'

export const UserMobilePermissionDeleteOneMutation = mutationField(
  'deleteOneUserMobilePermission',
  {
    type: 'UserMobilePermission',
    args: {
      where: nonNull('UserMobilePermissionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.userMobilePermission.delete({
        where,
        ...select,
      })
    },
  },
)
