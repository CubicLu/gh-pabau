import { queryField, list } from 'nexus'

export const UserPermissionAggregateQuery = queryField(
  'aggregateUserPermission',
  {
    type: 'AggregateUserPermission',
    args: {
      where: 'UserPermissionWhereInput',
      orderBy: list('UserPermissionOrderByWithRelationInput'),
      cursor: 'UserPermissionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userPermission.aggregate({ ...args, ...select }) as any
    },
  },
)
