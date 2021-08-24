import { mutationField, nonNull } from 'nexus'

export const UserMainPermissionUpdateManyMutation = mutationField(
  'updateManyUserMainPermission',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'UserMainPermissionWhereInput',
      data: nonNull('UserMainPermissionUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userMainPermission.updateMany(args as any)
    },
  },
)
