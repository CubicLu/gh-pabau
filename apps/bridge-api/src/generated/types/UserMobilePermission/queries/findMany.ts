import { queryField, nonNull, list } from 'nexus'

export const UserMobilePermissionFindManyQuery = queryField(
  'findManyUserMobilePermission',
  {
    type: nonNull(list(nonNull('UserMobilePermission'))),
    args: {
      where: 'UserMobilePermissionWhereInput',
      orderBy: list('UserMobilePermissionOrderByWithRelationInput'),
      cursor: 'UserMobilePermissionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserMobilePermissionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userMobilePermission.findMany({
        ...args,
        ...select,
      })
    },
  },
)
