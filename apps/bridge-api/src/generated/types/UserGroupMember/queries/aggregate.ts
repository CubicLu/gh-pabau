import { queryField, list } from 'nexus'

export const UserGroupMemberAggregateQuery = queryField(
  'aggregateUserGroupMember',
  {
    type: 'AggregateUserGroupMember',
    args: {
      where: 'UserGroupMemberWhereInput',
      orderBy: list('UserGroupMemberOrderByWithRelationInput'),
      cursor: 'UserGroupMemberWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userGroupMember.aggregate({ ...args, ...select }) as any
    },
  },
)
