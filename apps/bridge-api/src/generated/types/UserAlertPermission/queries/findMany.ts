import { queryField, nonNull, list } from 'nexus'

export const UserAlertPermissionFindManyQuery = queryField(
  'findManyUserAlertPermission',
  {
    type: nonNull(list(nonNull('UserAlertPermission'))),
    args: {
      where: 'UserAlertPermissionWhereInput',
      orderBy: list('UserAlertPermissionOrderByWithRelationInput'),
      cursor: 'UserAlertPermissionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserAlertPermissionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userAlertPermission.findMany({
        ...args,
        ...select,
      })
    },
  },
)
