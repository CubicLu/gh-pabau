import { mutationField, nonNull } from 'nexus'

export const AppPermissionDeleteOneMutation = mutationField(
  'deleteOneAppPermission',
  {
    type: 'AppPermission',
    args: {
      where: nonNull('AppPermissionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.appPermission.delete({
        where,
        ...select,
      })
    },
  },
)
