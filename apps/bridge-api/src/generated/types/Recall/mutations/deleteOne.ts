import { mutationField, nonNull } from 'nexus'

export const RecallDeleteOneMutation = mutationField('deleteOneRecall', {
  type: 'Recall',
  args: {
    where: nonNull('RecallWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.recall.delete({
      where,
      ...select,
    })
  },
})
