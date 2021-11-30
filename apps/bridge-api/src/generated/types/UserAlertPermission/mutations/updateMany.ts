import { mutationField, nonNull } from 'nexus'

export const UserAlertPermissionUpdateManyMutation = mutationField(
  'updateManyUserAlertPermission',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('UserAlertPermissionUpdateManyMutationInput'),
      where: 'UserAlertPermissionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userAlertPermission.updateMany(args as any)
    },
  },
)
