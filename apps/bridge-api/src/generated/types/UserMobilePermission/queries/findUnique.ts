import { queryField, nonNull } from 'nexus'

export const UserMobilePermissionFindUniqueQuery = queryField(
  'findUniqueUserMobilePermission',
  {
    type: 'UserMobilePermission',
    args: {
      where: nonNull('UserMobilePermissionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.userMobilePermission.findUnique({
        where,
        ...select,
      })
    },
  },
)
