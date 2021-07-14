import { queryField, nonNull } from 'nexus'

export const UserPermissionFindUniqueQuery = queryField(
  'findUniqueUserPermission',
  {
    type: 'UserPermission',
    args: {
      where: nonNull('UserPermissionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.userPermission.findUnique({
        where,
        ...select,
      })
    },
  },
)
