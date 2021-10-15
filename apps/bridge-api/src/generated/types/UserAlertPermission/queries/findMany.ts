import { queryField, nonNull, list } from 'nexus'

export const UserAlertPermissionFindManyQuery = queryField(
  'findManyUserAlertPermission',
  {
    type: nonNull(list(nonNull('UserAlertPermission'))),
    args: {
      where: 'UserAlertPermissionWhereInput',
      orderBy: list('UserAlertPermissionOrderByInput'),
      cursor: 'UserAlertPermissionWhereUniqueInput',
      distinct: 'UserAlertPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userAlertPermission.findMany({
        ...args,
        ...select,
      })
    },
  },
)
