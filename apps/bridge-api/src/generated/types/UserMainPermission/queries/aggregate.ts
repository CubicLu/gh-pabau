import { queryField, list } from 'nexus'

export const UserMainPermissionAggregateQuery = queryField(
  'aggregateUserMainPermission',
  {
    type: 'AggregateUserMainPermission',
    args: {
      where: 'UserMainPermissionWhereInput',
      orderBy: list('UserMainPermissionOrderByWithRelationInput'),
      cursor: 'UserMainPermissionWhereUniqueInput',
      distinct: 'UserMainPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userMainPermission.aggregate({ ...args, ...select }) as any
    },
  },
)
