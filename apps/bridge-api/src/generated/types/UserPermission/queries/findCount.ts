import { queryField, nonNull, list } from 'nexus'

export const UserPermissionFindCountQuery = queryField(
  'findManyUserPermissionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'UserPermissionWhereInput',
      orderBy: list('UserPermissionOrderByWithRelationInput'),
      cursor: 'UserPermissionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserPermissionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userPermission.count(args as any)
    },
  },
)
