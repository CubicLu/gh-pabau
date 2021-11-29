import { queryField, list } from 'nexus'

export const GroupPermissionFindFirstQuery = queryField(
  'findFirstGroupPermission',
  {
    type: 'GroupPermission',
    args: {
      where: 'GroupPermissionWhereInput',
      orderBy: list('GroupPermissionOrderByWithRelationInput'),
      cursor: 'GroupPermissionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('GroupPermissionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.groupPermission.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
