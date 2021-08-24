import { mutationField, nonNull } from 'nexus'

export const InvBillerDeleteOneMutation = mutationField('deleteOneInvBiller', {
  type: 'InvBiller',
  args: {
    where: nonNull('InvBillerWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.invBiller.delete({
      where,
      ...select,
    })
  },
})
