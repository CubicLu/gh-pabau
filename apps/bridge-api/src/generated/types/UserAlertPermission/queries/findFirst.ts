import { queryField, list } from 'nexus'

export const UserAlertPermissionFindFirstQuery = queryField(
  'findFirstUserAlertPermission',
  {
    type: 'UserAlertPermission',
    args: {
      where: 'UserAlertPermissionWhereInput',
      orderBy: list('UserAlertPermissionOrderByWithRelationInput'),
      cursor: 'UserAlertPermissionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserAlertPermissionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userAlertPermission.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
