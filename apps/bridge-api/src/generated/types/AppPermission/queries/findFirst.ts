import { queryField, list } from 'nexus'

export const AppPermissionFindFirstQuery = queryField(
  'findFirstAppPermission',
  {
    type: 'AppPermission',
    args: {
      where: 'AppPermissionWhereInput',
      orderBy: list('AppPermissionOrderByInput'),
      cursor: 'AppPermissionWhereUniqueInput',
      distinct: 'AppPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appPermission.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
