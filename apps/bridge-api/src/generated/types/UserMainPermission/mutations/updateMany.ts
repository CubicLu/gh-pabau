import { mutationField, nonNull } from 'nexus'

export const UserMainPermissionUpdateManyMutation = mutationField(
  'updateManyUserMainPermission',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('UserMainPermissionUpdateManyMutationInput'),
      where: 'UserMainPermissionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userMainPermission.updateMany(args as any)
    },
  },
)
