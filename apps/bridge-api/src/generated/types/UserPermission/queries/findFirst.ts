import { queryField, list } from 'nexus'

export const UserPermissionFindFirstQuery = queryField(
  'findFirstUserPermission',
  {
    type: 'UserPermission',
    args: {
      where: 'UserPermissionWhereInput',
      orderBy: list('UserPermissionOrderByWithRelationInput'),
      cursor: 'UserPermissionWhereUniqueInput',
      distinct: 'UserPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userPermission.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
