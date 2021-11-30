import { mutationField, nonNull } from 'nexus'

export const GroupPermissionUpdateManyMutation = mutationField(
  'updateManyGroupPermission',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('GroupPermissionUpdateManyMutationInput'),
      where: 'GroupPermissionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.groupPermission.updateMany(args as any)
    },
  },
)
