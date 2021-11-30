import { queryField, list } from 'nexus'

export const UserPermissionFindFirstQuery = queryField(
  'findFirstUserPermission',
  {
    type: 'UserPermission',
    args: {
      where: 'UserPermissionWhereInput',
      orderBy: list('UserPermissionOrderByWithRelationInput'),
      cursor: 'UserPermissionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserPermissionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userPermission.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
