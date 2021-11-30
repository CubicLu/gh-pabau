import { mutationField, nonNull } from 'nexus'

export const AppPermissionUpdateManyMutation = mutationField(
  'updateManyAppPermission',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AppPermissionUpdateManyMutationInput'),
      where: 'AppPermissionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.appPermission.updateMany(args as any)
    },
  },
)
