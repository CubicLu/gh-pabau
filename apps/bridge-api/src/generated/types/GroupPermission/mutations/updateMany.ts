import { mutationField, nonNull } from 'nexus'

export const GroupPermissionUpdateManyMutation = mutationField(
  'updateManyGroupPermission',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'GroupPermissionWhereInput',
      data: nonNull('GroupPermissionUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.groupPermission.updateMany(args as any)
    },
  },
)
