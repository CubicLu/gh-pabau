import { queryField, list } from 'nexus'

export const UserGroupMemberFindFirstQuery = queryField(
  'findFirstUserGroupMember',
  {
    type: 'UserGroupMember',
    args: {
      where: 'UserGroupMemberWhereInput',
      orderBy: list('UserGroupMemberOrderByInput'),
      cursor: 'UserGroupMemberWhereUniqueInput',
      distinct: 'UserGroupMemberScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userGroupMember.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
