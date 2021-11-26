import { queryField, nonNull, list } from 'nexus'

export const UserGroupMemberFindManyQuery = queryField(
  'findManyUserGroupMember',
  {
    type: nonNull(list(nonNull('UserGroupMember'))),
    args: {
      where: 'UserGroupMemberWhereInput',
      orderBy: list('UserGroupMemberOrderByWithRelationInput'),
      cursor: 'UserGroupMemberWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserGroupMemberScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userGroupMember.findMany({
        ...args,
        ...select,
      })
    },
  },
)
