import { mutationField, nonNull } from 'nexus'

export const AtConcernDeleteOneMutation = mutationField('deleteOneAtConcern', {
  type: 'AtConcern',
  args: {
    where: nonNull('AtConcernWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.atConcern.delete({
      where,
      ...select,
    })
  },
})
