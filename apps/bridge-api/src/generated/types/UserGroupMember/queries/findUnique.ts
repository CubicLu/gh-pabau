import { queryField, nonNull } from 'nexus'

export const UserGroupMemberFindUniqueQuery = queryField(
  'findUniqueUserGroupMember',
  {
    type: 'UserGroupMember',
    args: {
      where: nonNull('UserGroupMemberWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.userGroupMember.findUnique({
        where,
        ...select,
      })
    },
  },
)
