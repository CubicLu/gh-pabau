import { queryField, nonNull } from 'nexus'

export const AppPermissionFindUniqueQuery = queryField(
  'findUniqueAppPermission',
  {
    type: 'AppPermission',
    args: {
      where: nonNull('AppPermissionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.appPermission.findUnique({
        where,
        ...select,
      })
    },
  },
)
