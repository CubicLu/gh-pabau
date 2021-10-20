import { queryField, nonNull, list } from 'nexus'

export const UserGroupFindManyQuery = queryField('findManyUserGroup', {
  type: nonNull(list(nonNull('UserGroup'))),
  args: {
    where: 'UserGroupWhereInput',
    orderBy: list('UserGroupOrderByWithRelationInput'),
    cursor: 'UserGroupWhereUniqueInput',
    distinct: 'UserGroupScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userGroup.findMany({
      ...args,
      ...select,
    })
  },
})
