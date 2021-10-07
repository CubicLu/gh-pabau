import { mutationField, nonNull } from 'nexus'

export const UserGroupUpdateOneMutation = mutationField('updateOneUserGroup', {
  type: nonNull('UserGroup'),
  args: {
    where: nonNull('UserGroupWhereUniqueInput'),
    data: nonNull('UserGroupUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.userGroup.update({
      where,
      data,
      ...select,
    })
  },
})
