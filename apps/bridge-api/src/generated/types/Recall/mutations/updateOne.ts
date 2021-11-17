import { mutationField, nonNull } from 'nexus'

export const RecallUpdateOneMutation = mutationField('updateOneRecall', {
  type: nonNull('Recall'),
  args: {
    where: nonNull('RecallWhereUniqueInput'),
    data: nonNull('RecallUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.recall.update({
      where,
      data,
      ...select,
    })
  },
})
