import { queryField, list } from 'nexus'

export const UserGroupAggregateQuery = queryField('aggregateUserGroup', {
  type: 'AggregateUserGroup',
  args: {
    where: 'UserGroupWhereInput',
    orderBy: list('UserGroupOrderByWithRelationInput'),
    cursor: 'UserGroupWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userGroup.aggregate({ ...args, ...select }) as any
  },
})
