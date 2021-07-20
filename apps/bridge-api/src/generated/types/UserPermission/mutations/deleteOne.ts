import { mutationField, nonNull } from 'nexus'

export const UserPermissionDeleteOneMutation = mutationField(
  'deleteOneUserPermission',
  {
    type: 'UserPermission',
    args: {
      where: nonNull('UserPermissionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.userPermission.delete({
        where,
        ...select,
      })
    },
  },
)
