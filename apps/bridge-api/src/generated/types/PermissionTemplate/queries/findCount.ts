import { queryField, nonNull, list } from 'nexus'

export const PermissionTemplateFindCountQuery = queryField(
  'findManyPermissionTemplateCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'PermissionTemplateWhereInput',
      orderBy: list('PermissionTemplateOrderByWithRelationInput'),
      cursor: 'PermissionTemplateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('PermissionTemplateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.permissionTemplate.count(args as any)
    },
  },
)
