import { queryField, list } from 'nexus'

export const UserMainPermissionFindFirstQuery = queryField(
  'findFirstUserMainPermission',
  {
    type: 'UserMainPermission',
    args: {
      where: 'UserMainPermissionWhereInput',
      orderBy: list('UserMainPermissionOrderByInput'),
      cursor: 'UserMainPermissionWhereUniqueInput',
      distinct: 'UserMainPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userMainPermission.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
