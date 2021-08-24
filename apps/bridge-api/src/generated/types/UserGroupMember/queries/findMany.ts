import { queryField, nonNull, list } from 'nexus'

export const UserGroupMemberFindManyQuery = queryField(
  'findManyUserGroupMember',
  {
    type: nonNull(list(nonNull('UserGroupMember'))),
    args: {
      where: 'UserGroupMemberWhereInput',
      orderBy: list('UserGroupMemberOrderByInput'),
      cursor: 'UserGroupMemberWhereUniqueInput',
      distinct: 'UserGroupMemberScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userGroupMember.findMany({
        ...args,
        ...select,
      })
    },
  },
)
