import { queryField, nonNull } from 'nexus'

export const UserAlertPermissionFindUniqueQuery = queryField(
  'findUniqueUserAlertPermission',
  {
    type: 'UserAlertPermission',
    args: {
      where: nonNull('UserAlertPermissionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.userAlertPermission.findUnique({
        where,
        ...select,
      })
    },
  },
)
