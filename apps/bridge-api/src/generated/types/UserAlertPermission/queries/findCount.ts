import { queryField, nonNull, list } from 'nexus'

export const UserAlertPermissionFindCountQuery = queryField(
  'findManyUserAlertPermissionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'UserAlertPermissionWhereInput',
      orderBy: list('UserAlertPermissionOrderByWithRelationInput'),
      cursor: 'UserAlertPermissionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserAlertPermissionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userAlertPermission.count(args as any)
    },
  },
)
