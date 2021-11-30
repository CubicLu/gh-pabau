import { queryField, nonNull, list } from 'nexus'

export const UserMainPermissionFindManyQuery = queryField(
  'findManyUserMainPermission',
  {
    type: nonNull(list(nonNull('UserMainPermission'))),
    args: {
      where: 'UserMainPermissionWhereInput',
      orderBy: list('UserMainPermissionOrderByWithRelationInput'),
      cursor: 'UserMainPermissionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserMainPermissionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userMainPermission.findMany({
        ...args,
        ...select,
      })
    },
  },
)
