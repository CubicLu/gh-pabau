import { mutationField, nonNull } from 'nexus'

export const BatchUpdateManyMutation = mutationField('updateManyBatch', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'BatchWhereInput',
    data: nonNull('BatchUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.batch.updateMany(args as any)
  },
})
