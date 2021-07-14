import { mutationField, nonNull } from 'nexus'

export const PermissionTemplateDeleteOneMutation = mutationField(
  'deleteOnePermissionTemplate',
  {
    type: 'PermissionTemplate',
    args: {
      where: nonNull('PermissionTemplateWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.permissionTemplate.delete({
        where,
        ...select,
      })
    },
  },
)
