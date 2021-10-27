import { queryField, nonNull, list } from 'nexus'

export const UserMainPermissionFindCountQuery = queryField(
  'findManyUserMainPermissionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'UserMainPermissionWhereInput',
      orderBy: list('UserMainPermissionOrderByWithRelationInput'),
      cursor: 'UserMainPermissionWhereUniqueInput',
      distinct: 'UserMainPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userMainPermission.count(args as any)
    },
  },
)
