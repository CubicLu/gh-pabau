import { mutationField, nonNull } from 'nexus'

export const BatchItemUpdateManyMutation = mutationField(
  'updateManyBatchItem',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'BatchItemWhereInput',
      data: nonNull('BatchItemUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.batchItem.updateMany(args as any)
    },
  },
)
