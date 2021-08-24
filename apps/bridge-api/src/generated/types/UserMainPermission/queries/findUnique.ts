import { queryField, nonNull } from 'nexus'

export const UserMainPermissionFindUniqueQuery = queryField(
  'findUniqueUserMainPermission',
  {
    type: 'UserMainPermission',
    args: {
      where: nonNull('UserMainPermissionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.userMainPermission.findUnique({
        where,
        ...select,
      })
    },
  },
)
