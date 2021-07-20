import { mutationField, nonNull } from 'nexus'

export const UserAlertPermissionUpdateManyMutation = mutationField(
  'updateManyUserAlertPermission',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'UserAlertPermissionWhereInput',
      data: nonNull('UserAlertPermissionUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userAlertPermission.updateMany(args as any)
    },
  },
)
