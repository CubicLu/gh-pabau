import { mutationField, nonNull } from 'nexus'

export const UserGroupCreateOneMutation = mutationField('createOneUserGroup', {
  type: nonNull('UserGroup'),
  args: {
    data: nonNull('UserGroupCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.userGroup.create({
      data,
      ...select,
    })
  },
})
