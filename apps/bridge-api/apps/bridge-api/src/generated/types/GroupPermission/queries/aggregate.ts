import { queryField, list } from 'nexus'

export const GroupPermissionAggregateQuery = queryField(
  'aggregateGroupPermission',
  {
    type: 'AggregateGroupPermission',
    args: {
      where: 'GroupPermissionWhereInput',
      orderBy: list('GroupPermissionOrderByWithRelationInput'),
      cursor: 'GroupPermissionWhereUniqueInput',
      distinct: 'GroupPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.groupPermission.aggregate({ ...args, ...select }) as any
    },
  },
)
