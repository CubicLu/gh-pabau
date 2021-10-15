import { queryField, list } from 'nexus'

export const UserMobilePermissionAggregateQuery = queryField(
  'aggregateUserMobilePermission',
  {
    type: 'AggregateUserMobilePermission',
    args: {
      where: 'UserMobilePermissionWhereInput',
      orderBy: list('UserMobilePermissionOrderByInput'),
      cursor: 'UserMobilePermissionWhereUniqueInput',
      distinct: 'UserMobilePermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userMobilePermission.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
