import { queryField, list } from 'nexus'

export const UserGroupFindFirstQuery = queryField('findFirstUserGroup', {
  type: 'UserGroup',
  args: {
    where: 'UserGroupWhereInput',
    orderBy: list('UserGroupOrderByWithRelationInput'),
    cursor: 'UserGroupWhereUniqueInput',
    distinct: 'UserGroupScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userGroup.findFirst({
      ...args,
      ...select,
    })
  },
})
