import { mutationField, nonNull } from 'nexus'

export const UserMobilePermissionUpdateManyMutation = mutationField(
  'updateManyUserMobilePermission',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('UserMobilePermissionUpdateManyMutationInput'),
      where: 'UserMobilePermissionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userMobilePermission.updateMany(args as any)
    },
  },
)
