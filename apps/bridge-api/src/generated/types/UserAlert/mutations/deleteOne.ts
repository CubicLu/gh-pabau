import { mutationField, nonNull } from 'nexus'

export const UserAlertDeleteOneMutation = mutationField('deleteOneUserAlert', {
  type: 'UserAlert',
  args: {
    where: nonNull('UserAlertWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.userAlert.delete({
      where,
      ...select,
    })
  },
})
