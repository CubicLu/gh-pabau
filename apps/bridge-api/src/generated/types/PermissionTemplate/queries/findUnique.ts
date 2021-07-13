import { queryField, nonNull } from 'nexus'

export const PermissionTemplateFindUniqueQuery = queryField(
  'findUniquePermissionTemplate',
  {
    type: 'PermissionTemplate',
    args: {
      where: nonNull('PermissionTemplateWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.permissionTemplate.findUnique({
        where,
        ...select,
      })
    },
  },
)
