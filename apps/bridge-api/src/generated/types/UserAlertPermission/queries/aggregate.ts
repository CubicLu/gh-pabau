import { queryField, list } from 'nexus'

export const UserAlertPermissionAggregateQuery = queryField(
  'aggregateUserAlertPermission',
  {
    type: 'AggregateUserAlertPermission',
    args: {
      where: 'UserAlertPermissionWhereInput',
      orderBy: list('UserAlertPermissionOrderByWithRelationInput'),
      cursor: 'UserAlertPermissionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userAlertPermission.aggregate({ ...args, ...select }) as any
    },
  },
)
