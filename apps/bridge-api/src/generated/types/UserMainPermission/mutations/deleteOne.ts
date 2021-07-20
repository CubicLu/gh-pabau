import { mutationField, nonNull } from 'nexus'

export const UserMainPermissionDeleteOneMutation = mutationField(
  'deleteOneUserMainPermission',
  {
    type: 'UserMainPermission',
    args: {
      where: nonNull('UserMainPermissionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.userMainPermission.delete({
        where,
        ...select,
      })
    },
  },
)
