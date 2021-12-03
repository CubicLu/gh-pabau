import { queryField, nonNull, list } from 'nexus'

export const UserPermissionFindManyQuery = queryField(
  'findManyUserPermission',
  {
    type: nonNull(list(nonNull('UserPermission'))),
    args: {
      where: 'UserPermissionWhereInput',
      orderBy: list('UserPermissionOrderByWithRelationInput'),
      cursor: 'UserPermissionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserPermissionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userPermission.findMany({
        ...args,
        ...select,
      })
    },
  },
)
