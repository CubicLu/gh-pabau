import { queryField, nonNull, list } from 'nexus'

export const UserGroupMemberFindCountQuery = queryField(
  'findManyUserGroupMemberCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'UserGroupMemberWhereInput',
      orderBy: list('UserGroupMemberOrderByWithRelationInput'),
      cursor: 'UserGroupMemberWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserGroupMemberScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userGroupMember.count(args as any)
    },
  },
)
