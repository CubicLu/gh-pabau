import { mutationField, nonNull } from 'nexus'

export const UserGroupUpdateOneMutation = mutationField('updateOneUserGroup', {
  type: nonNull('UserGroup'),
  args: {
    data: nonNull('UserGroupUpdateInput'),
    where: nonNull('UserGroupWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.userGroup.update({
      where,
      data,
      ...select,
    })
  },
})
