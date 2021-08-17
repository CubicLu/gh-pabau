import { queryField, list } from 'nexus'

export const GroupPermissionFindFirstQuery = queryField(
  'findFirstGroupPermission',
  {
    type: 'GroupPermission',
    args: {
      where: 'GroupPermissionWhereInput',
      orderBy: list('GroupPermissionOrderByInput'),
      cursor: 'GroupPermissionWhereUniqueInput',
      distinct: 'GroupPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.groupPermission.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
