import { queryField, list } from 'nexus'

export const PermissionTemplateAggregateQuery = queryField(
  'aggregatePermissionTemplate',
  {
    type: 'AggregatePermissionTemplate',
    args: {
      where: 'PermissionTemplateWhereInput',
      orderBy: list('PermissionTemplateOrderByInput'),
      cursor: 'PermissionTemplateWhereUniqueInput',
      distinct: 'PermissionTemplateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.permissionTemplate.aggregate({ ...args, ...select }) as any
    },
  },
)
