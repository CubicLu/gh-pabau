import { queryField, list } from 'nexus'

export const UserMobilePermissionFindFirstQuery = queryField(
  'findFirstUserMobilePermission',
  {
    type: 'UserMobilePermission',
    args: {
      where: 'UserMobilePermissionWhereInput',
      orderBy: list('UserMobilePermissionOrderByInput'),
      cursor: 'UserMobilePermissionWhereUniqueInput',
      distinct: 'UserMobilePermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userMobilePermission.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
