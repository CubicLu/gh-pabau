import { queryField, nonNull, list } from 'nexus'

export const UserGroupFindManyQuery = queryField('findManyUserGroup', {
  type: nonNull(list(nonNull('UserGroup'))),
  args: {
    where: 'UserGroupWhereInput',
    orderBy: list('UserGroupOrderByWithRelationInput'),
    cursor: 'UserGroupWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('UserGroupScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userGroup.findMany({
      ...args,
      ...select,
    })
  },
})
