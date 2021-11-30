import { mutationField, nonNull } from 'nexus'

export const PermissionTemplateUpdateManyMutation = mutationField(
  'updateManyPermissionTemplate',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('PermissionTemplateUpdateManyMutationInput'),
      where: 'PermissionTemplateWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.permissionTemplate.updateMany(args as any)
    },
  },
)
