import { mutationField, nonNull } from 'nexus'

export const GroupPermissionDeleteOneMutation = mutationField(
  'deleteOneGroupPermission',
  {
    type: 'GroupPermission',
    args: {
      where: nonNull('GroupPermissionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.groupPermission.delete({
        where,
        ...select,
      })
    },
  },
)
