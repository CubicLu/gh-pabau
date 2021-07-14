import { mutationField, nonNull } from 'nexus'

export const BatchItemDeleteOneMutation = mutationField('deleteOneBatchItem', {
  type: 'BatchItem',
  args: {
    where: nonNull('BatchItemWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.batchItem.delete({
      where,
      ...select,
    })
  },
})
