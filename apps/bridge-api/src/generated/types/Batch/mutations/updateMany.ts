import { mutationField, nonNull } from 'nexus'

export const BatchUpdateManyMutation = mutationField('updateManyBatch', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('BatchUpdateManyMutationInput'),
    where: 'BatchWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.batch.updateMany(args as any)
  },
})
