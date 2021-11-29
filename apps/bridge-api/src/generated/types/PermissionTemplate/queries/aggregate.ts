import { queryField, list } from 'nexus'

export const PermissionTemplateAggregateQuery = queryField(
  'aggregatePermissionTemplate',
  {
    type: 'AggregatePermissionTemplate',
    args: {
      where: 'PermissionTemplateWhereInput',
      orderBy: list('PermissionTemplateOrderByWithRelationInput'),
      cursor: 'PermissionTemplateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.permissionTemplate.aggregate({ ...args, ...select }) as any
    },
  },
)
