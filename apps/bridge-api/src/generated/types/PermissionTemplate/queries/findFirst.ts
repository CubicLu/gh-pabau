import { queryField, list } from 'nexus'

export const PermissionTemplateFindFirstQuery = queryField(
  'findFirstPermissionTemplate',
  {
    type: 'PermissionTemplate',
    args: {
      where: 'PermissionTemplateWhereInput',
      orderBy: list('PermissionTemplateOrderByWithRelationInput'),
      cursor: 'PermissionTemplateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('PermissionTemplateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.permissionTemplate.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
