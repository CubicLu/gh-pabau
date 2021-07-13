import { mutationField, nonNull } from 'nexus'

export const PermissionTemplateUpsertOneMutation = mutationField(
  'upsertOnePermissionTemplate',
  {
    type: nonNull('PermissionTemplate'),
    args: {
      where: nonNull('PermissionTemplateWhereUniqueInput'),
      create: nonNull('PermissionTemplateCreateInput'),
      update: nonNull('PermissionTemplateUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.permissionTemplate.upsert({
        ...args,
        ...select,
      })
    },
  },
)
