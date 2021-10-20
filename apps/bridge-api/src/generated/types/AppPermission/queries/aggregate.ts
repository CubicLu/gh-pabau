import { queryField, list } from 'nexus'

export const AppPermissionAggregateQuery = queryField(
  'aggregateAppPermission',
  {
    type: 'AggregateAppPermission',
    args: {
      where: 'AppPermissionWhereInput',
      orderBy: list('AppPermissionOrderByWithRelationInput'),
      cursor: 'AppPermissionWhereUniqueInput',
      distinct: 'AppPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appPermission.aggregate({ ...args, ...select }) as any
    },
  },
)
