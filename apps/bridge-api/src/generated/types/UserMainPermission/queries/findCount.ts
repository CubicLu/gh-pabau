import { queryField, nonNull, list } from 'nexus'

export const UserMainPermissionFindCountQuery = queryField(
  'findManyUserMainPermissionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'UserMainPermissionWhereInput',
      orderBy: list('UserMainPermissionOrderByWithRelationInput'),
      cursor: 'UserMainPermissionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserMainPermissionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userMainPermission.count(args as any)
    },
  },
)
