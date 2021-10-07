import { mutationField, nonNull } from 'nexus'

export const UserMobilePermissionUpdateManyMutation = mutationField(
  'updateManyUserMobilePermission',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'UserMobilePermissionWhereInput',
      data: nonNull('UserMobilePermissionUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userMobilePermission.updateMany(args as any)
    },
  },
)
