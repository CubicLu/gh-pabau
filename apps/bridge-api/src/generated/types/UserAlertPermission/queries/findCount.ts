import { queryField, nonNull, list } from 'nexus'

export const UserAlertPermissionFindCountQuery = queryField(
  'findManyUserAlertPermissionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'UserAlertPermissionWhereInput',
      orderBy: list('UserAlertPermissionOrderByInput'),
      cursor: 'UserAlertPermissionWhereUniqueInput',
      distinct: 'UserAlertPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userAlertPermission.count(args as any)
    },
  },
)
