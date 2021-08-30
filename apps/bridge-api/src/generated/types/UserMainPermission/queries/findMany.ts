import { queryField, nonNull, list } from 'nexus'

export const UserMainPermissionFindManyQuery = queryField(
  'findManyUserMainPermission',
  {
    type: nonNull(list(nonNull('UserMainPermission'))),
    args: {
      where: 'UserMainPermissionWhereInput',
      orderBy: list('UserMainPermissionOrderByWithRelationInput'),
      cursor: 'UserMainPermissionWhereUniqueInput',
      distinct: 'UserMainPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userMainPermission.findMany({
        ...args,
        ...select,
      })
    },
  },
)
