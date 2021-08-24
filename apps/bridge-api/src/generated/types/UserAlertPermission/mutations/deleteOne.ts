import { mutationField, nonNull } from 'nexus'

export const UserAlertPermissionDeleteOneMutation = mutationField(
  'deleteOneUserAlertPermission',
  {
    type: 'UserAlertPermission',
    args: {
      where: nonNull('UserAlertPermissionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.userAlertPermission.delete({
        where,
        ...select,
      })
    },
  },
)
