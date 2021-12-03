import { mutationField, nonNull } from 'nexus'

export const RecallUpdateOneMutation = mutationField('updateOneRecall', {
  type: nonNull('Recall'),
  args: {
    data: nonNull('RecallUpdateInput'),
    where: nonNull('RecallWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.recall.update({
      where,
      data,
      ...select,
    })
  },
})
