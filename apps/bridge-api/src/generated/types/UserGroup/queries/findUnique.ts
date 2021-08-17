import { queryField, nonNull } from 'nexus'

export const UserGroupFindUniqueQuery = queryField('findUniqueUserGroup', {
  type: 'UserGroup',
  args: {
    where: nonNull('UserGroupWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.userGroup.findUnique({
      where,
      ...select,
    })
  },
})
