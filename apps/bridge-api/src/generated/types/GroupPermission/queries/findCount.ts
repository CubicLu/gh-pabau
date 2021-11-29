import { queryField, nonNull, list } from 'nexus'

export const GroupPermissionFindCountQuery = queryField(
  'findManyGroupPermissionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'GroupPermissionWhereInput',
      orderBy: list('GroupPermissionOrderByWithRelationInput'),
      cursor: 'GroupPermissionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('GroupPermissionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.groupPermission.count(args as any)
    },
  },
)
