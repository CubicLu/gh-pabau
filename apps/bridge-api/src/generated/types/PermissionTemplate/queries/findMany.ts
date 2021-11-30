import { queryField, nonNull, list } from 'nexus'

export const PermissionTemplateFindManyQuery = queryField(
  'findManyPermissionTemplate',
  {
    type: nonNull(list(nonNull('PermissionTemplate'))),
    args: {
      where: 'PermissionTemplateWhereInput',
      orderBy: list('PermissionTemplateOrderByWithRelationInput'),
      cursor: 'PermissionTemplateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('PermissionTemplateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.permissionTemplate.findMany({
        ...args,
        ...select,
      })
    },
  },
)
