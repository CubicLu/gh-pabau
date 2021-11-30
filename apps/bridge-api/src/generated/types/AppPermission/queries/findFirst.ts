import { queryField, list } from 'nexus'

export const AppPermissionFindFirstQuery = queryField(
  'findFirstAppPermission',
  {
    type: 'AppPermission',
    args: {
      where: 'AppPermissionWhereInput',
      orderBy: list('AppPermissionOrderByWithRelationInput'),
      cursor: 'AppPermissionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AppPermissionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appPermission.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
