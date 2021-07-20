import { mutationField, nonNull } from 'nexus'

export const UserGroupDeleteOneMutation = mutationField('deleteOneUserGroup', {
  type: 'UserGroup',
  args: {
    where: nonNull('UserGroupWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.userGroup.delete({
      where,
      ...select,
    })
  },
})
