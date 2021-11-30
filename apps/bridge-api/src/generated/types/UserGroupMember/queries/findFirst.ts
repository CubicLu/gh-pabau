import { queryField, list } from 'nexus'

export const UserGroupMemberFindFirstQuery = queryField(
  'findFirstUserGroupMember',
  {
    type: 'UserGroupMember',
    args: {
      where: 'UserGroupMemberWhereInput',
      orderBy: list('UserGroupMemberOrderByWithRelationInput'),
      cursor: 'UserGroupMemberWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserGroupMemberScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userGroupMember.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
