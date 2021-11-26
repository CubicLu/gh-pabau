import { mutationField, nonNull } from 'nexus'

export const RecallUpdateManyMutation = mutationField('updateManyRecall', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('RecallUpdateManyMutationInput'),
    where: 'RecallWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.recall.updateMany(args as any)
  },
})
