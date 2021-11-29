import { mutationField, nonNull } from 'nexus'

export const PermissionTemplateUpdateOneMutation = mutationField(
  'updateOnePermissionTemplate',
  {
    type: nonNull('PermissionTemplate'),
    args: {
      data: nonNull('PermissionTemplateUpdateInput'),
      where: nonNull('PermissionTemplateWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.permissionTemplate.update({
        where,
        data,
        ...select,
      })
    },
  },
)
