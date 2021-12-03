import { queryField, list } from 'nexus'

export const UserMainPermissionFindFirstQuery = queryField(
  'findFirstUserMainPermission',
  {
    type: 'UserMainPermission',
    args: {
      where: 'UserMainPermissionWhereInput',
      orderBy: list('UserMainPermissionOrderByWithRelationInput'),
      cursor: 'UserMainPermissionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserMainPermissionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userMainPermission.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
