import { queryField, nonNull, list } from 'nexus'

export const AppPermissionFindCountQuery = queryField(
  'findManyAppPermissionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AppPermissionWhereInput',
      orderBy: list('AppPermissionOrderByWithRelationInput'),
      cursor: 'AppPermissionWhereUniqueInput',
      distinct: 'AppPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.appPermission.count(args as any)
    },
  },
)
