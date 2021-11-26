import { mutationField, nonNull } from 'nexus'

export const BatchItemUpdateManyMutation = mutationField(
  'updateManyBatchItem',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('BatchItemUpdateManyMutationInput'),
      where: 'BatchItemWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.batchItem.updateMany(args as any)
    },
  },
)
