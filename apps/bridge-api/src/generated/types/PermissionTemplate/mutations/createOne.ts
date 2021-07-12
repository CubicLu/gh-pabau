import { mutationField, nonNull } from 'nexus'

export const PermissionTemplateCreateOneMutation = mutationField(
  'createOnePermissionTemplate',
  {
    type: nonNull('PermissionTemplate'),
    args: {
      data: nonNull('PermissionTemplateCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.permissionTemplate.create({
        data,
        ...select,
      })
    },
  },
)
