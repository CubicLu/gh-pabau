import { queryField, list } from 'nexus'

export const UserAlertPermissionFindFirstQuery = queryField(
  'findFirstUserAlertPermission',
  {
    type: 'UserAlertPermission',
    args: {
      where: 'UserAlertPermissionWhereInput',
      orderBy: list('UserAlertPermissionOrderByInput'),
      cursor: 'UserAlertPermissionWhereUniqueInput',
      distinct: 'UserAlertPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userAlertPermission.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
