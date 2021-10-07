import { queryField, nonNull, list } from 'nexus'

export const UserGroupFindCountQuery = queryField('findManyUserGroupCount', {
  type: nonNull('Int'),
  args: {
    where: 'UserGroupWhereInput',
    orderBy: list('UserGroupOrderByWithRelationInput'),
    cursor: 'UserGroupWhereUniqueInput',
    distinct: 'UserGroupScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.userGroup.count(args as any)
  },
})
