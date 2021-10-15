import { queryField, nonNull, list } from 'nexus'

export const GroupPermissionFindManyQuery = queryField(
  'findManyGroupPermission',
  {
    type: nonNull(list(nonNull('GroupPermission'))),
    args: {
      where: 'GroupPermissionWhereInput',
      orderBy: list('GroupPermissionOrderByInput'),
      cursor: 'GroupPermissionWhereUniqueInput',
      distinct: 'GroupPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.groupPermission.findMany({
        ...args,
        ...select,
      })
    },
  },
)
