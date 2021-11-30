import { queryField, nonNull, list } from 'nexus'

export const GroupPermissionFindManyQuery = queryField(
  'findManyGroupPermission',
  {
    type: nonNull(list(nonNull('GroupPermission'))),
    args: {
      where: 'GroupPermissionWhereInput',
      orderBy: list('GroupPermissionOrderByWithRelationInput'),
      cursor: 'GroupPermissionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('GroupPermissionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.groupPermission.findMany({
        ...args,
        ...select,
      })
    },
  },
)
