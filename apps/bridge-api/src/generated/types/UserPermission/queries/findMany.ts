import { queryField, nonNull, list } from 'nexus'

export const UserPermissionFindManyQuery = queryField(
  'findManyUserPermission',
  {
    type: nonNull(list(nonNull('UserPermission'))),
    args: {
      where: 'UserPermissionWhereInput',
      orderBy: list('UserPermissionOrderByInput'),
      cursor: 'UserPermissionWhereUniqueInput',
      distinct: 'UserPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userPermission.findMany({
        ...args,
        ...select,
      })
    },
  },
)
