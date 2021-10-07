import { queryField, nonNull } from 'nexus'

export const GroupPermissionFindUniqueQuery = queryField(
  'findUniqueGroupPermission',
  {
    type: 'GroupPermission',
    args: {
      where: nonNull('GroupPermissionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.groupPermission.findUnique({
        where,
        ...select,
      })
    },
  },
)
