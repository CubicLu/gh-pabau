import { queryField, nonNull, list } from 'nexus'

export const PermissionTemplateFindManyQuery = queryField(
  'findManyPermissionTemplate',
  {
    type: nonNull(list(nonNull('PermissionTemplate'))),
    args: {
      where: 'PermissionTemplateWhereInput',
      orderBy: list('PermissionTemplateOrderByInput'),
      cursor: 'PermissionTemplateWhereUniqueInput',
      distinct: 'PermissionTemplateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.permissionTemplate.findMany({
        ...args,
        ...select,
      })
    },
  },
)
