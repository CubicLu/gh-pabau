import { queryField, nonNull, list } from 'nexus'

export const GroupPermissionFindCountQuery = queryField(
  'findManyGroupPermissionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'GroupPermissionWhereInput',
      orderBy: list('GroupPermissionOrderByInput'),
      cursor: 'GroupPermissionWhereUniqueInput',
      distinct: 'GroupPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.groupPermission.count(args as any)
    },
  },
)
