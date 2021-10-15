import { queryField, nonNull, list } from 'nexus'

export const PermissionTemplateFindCountQuery = queryField(
  'findManyPermissionTemplateCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'PermissionTemplateWhereInput',
      orderBy: list('PermissionTemplateOrderByInput'),
      cursor: 'PermissionTemplateWhereUniqueInput',
      distinct: 'PermissionTemplateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.permissionTemplate.count(args as any)
    },
  },
)
