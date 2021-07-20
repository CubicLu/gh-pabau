import { mutationField, nonNull } from 'nexus'

export const PermissionTemplateUpdateOneMutation = mutationField(
  'updateOnePermissionTemplate',
  {
    type: nonNull('PermissionTemplate'),
    args: {
      where: nonNull('PermissionTemplateWhereUniqueInput'),
      data: nonNull('PermissionTemplateUpdateInput'),
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
