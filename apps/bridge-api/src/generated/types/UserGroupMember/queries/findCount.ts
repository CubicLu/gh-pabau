import { queryField, nonNull, list } from 'nexus'

export const UserGroupMemberFindCountQuery = queryField(
  'findManyUserGroupMemberCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'UserGroupMemberWhereInput',
      orderBy: list('UserGroupMemberOrderByWithRelationInput'),
      cursor: 'UserGroupMemberWhereUniqueInput',
      distinct: 'UserGroupMemberScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userGroupMember.count(args as any)
    },
  },
)
