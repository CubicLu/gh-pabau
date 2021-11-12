import { mutationField, nonNull } from 'nexus'

export const RecallCreateOneMutation = mutationField('createOneRecall', {
  type: nonNull('Recall'),
  args: {
    data: nonNull('RecallCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.recall.create({
      data,
      ...select,
    })
  },
})
