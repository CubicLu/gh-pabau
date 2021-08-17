import { mutationField, nonNull } from 'nexus'

export const PermissionTemplateUpdateManyMutation = mutationField(
  'updateManyPermissionTemplate',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'PermissionTemplateWhereInput',
      data: nonNull('PermissionTemplateUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.permissionTemplate.updateMany(args as any)
    },
  },
)
