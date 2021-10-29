import { mutationField, nonNull } from 'nexus'

export const RecallUpsertOneMutation = mutationField('upsertOneRecall', {
  type: nonNull('Recall'),
  args: {
    where: nonNull('RecallWhereUniqueInput'),
    create: nonNull('RecallCreateInput'),
    update: nonNull('RecallUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.recall.upsert({
      ...args,
      ...select,
    })
  },
})
