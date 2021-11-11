import { mutationField, nonNull } from 'nexus'

export const PathwayDeleteOneMutation = mutationField('deleteOnePathway', {
  type: 'Pathway',
  args: {
    where: nonNull('PathwayWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.pathway.delete({
      where,
      ...select,
    })
  },
})
