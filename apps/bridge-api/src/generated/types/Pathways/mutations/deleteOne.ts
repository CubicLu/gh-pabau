import { mutationField, nonNull } from 'nexus'

export const PathwaysDeleteOneMutation = mutationField('deleteOnePathways', {
  type: 'Pathways',
  args: {
    where: nonNull('PathwaysWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.pathways.delete({
      where,
      ...select,
    })
  },
})
