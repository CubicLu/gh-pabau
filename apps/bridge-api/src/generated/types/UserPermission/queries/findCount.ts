import { queryField, nonNull, list } from 'nexus'

export const UserPermissionFindCountQuery = queryField(
  'findManyUserPermissionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'UserPermissionWhereInput',
      orderBy: list('UserPermissionOrderByWithRelationInput'),
      cursor: 'UserPermissionWhereUniqueInput',
      distinct: 'UserPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userPermission.count(args as any)
    },
  },
)
