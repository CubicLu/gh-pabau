import { queryField, nonNull, list } from 'nexus'

export const UserMobilePermissionFindManyQuery = queryField(
  'findManyUserMobilePermission',
  {
    type: nonNull(list(nonNull('UserMobilePermission'))),
    args: {
      where: 'UserMobilePermissionWhereInput',
      orderBy: list('UserMobilePermissionOrderByWithRelationInput'),
      cursor: 'UserMobilePermissionWhereUniqueInput',
      distinct: 'UserMobilePermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userMobilePermission.findMany({
        ...args,
        ...select,
      })
    },
  },
)
