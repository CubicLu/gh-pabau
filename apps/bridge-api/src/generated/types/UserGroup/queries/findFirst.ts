import { queryField, list } from 'nexus'

export const UserGroupFindFirstQuery = queryField('findFirstUserGroup', {
  type: 'UserGroup',
  args: {
    where: 'UserGroupWhereInput',
    orderBy: list('UserGroupOrderByWithRelationInput'),
    cursor: 'UserGroupWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('UserGroupScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userGroup.findFirst({
      ...args,
      ...select,
    })
  },
})
