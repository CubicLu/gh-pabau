import { queryField, nonNull, list } from 'nexus'

export const UserMobilePermissionFindCountQuery = queryField(
  'findManyUserMobilePermissionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'UserMobilePermissionWhereInput',
      orderBy: list('UserMobilePermissionOrderByWithRelationInput'),
      cursor: 'UserMobilePermissionWhereUniqueInput',
      distinct: 'UserMobilePermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userMobilePermission.count(args as any)
    },
  },
)
