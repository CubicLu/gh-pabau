import { queryField, list } from 'nexus'

export const UserMobilePermissionAggregateQuery = queryField(
  'aggregateUserMobilePermission',
  {
    type: 'AggregateUserMobilePermission',
    args: {
      where: 'UserMobilePermissionWhereInput',
      orderBy: list('UserMobilePermissionOrderByWithRelationInput'),
      cursor: 'UserMobilePermissionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userMobilePermission.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
