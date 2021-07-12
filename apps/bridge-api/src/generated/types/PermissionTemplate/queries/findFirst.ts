import { queryField, list } from 'nexus'

export const PermissionTemplateFindFirstQuery = queryField(
  'findFirstPermissionTemplate',
  {
    type: 'PermissionTemplate',
    args: {
      where: 'PermissionTemplateWhereInput',
      orderBy: list('PermissionTemplateOrderByInput'),
      cursor: 'PermissionTemplateWhereUniqueInput',
      distinct: 'PermissionTemplateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.permissionTemplate.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
