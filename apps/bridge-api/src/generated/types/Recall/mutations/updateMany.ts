import { mutationField, nonNull } from 'nexus'

export const RecallUpdateManyMutation = mutationField('updateManyRecall', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'RecallWhereInput',
    data: nonNull('RecallUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.recall.updateMany(args as any)
  },
})
