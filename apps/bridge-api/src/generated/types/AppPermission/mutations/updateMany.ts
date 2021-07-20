import { mutationField, nonNull } from 'nexus'

export const AppPermissionUpdateManyMutation = mutationField(
  'updateManyAppPermission',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AppPermissionWhereInput',
      data: nonNull('AppPermissionUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.appPermission.updateMany(args as any)
    },
  },
)
