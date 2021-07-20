import { mutationField, nonNull } from 'nexus'

export const BatchDeleteOneMutation = mutationField('deleteOneBatch', {
  type: 'Batch',
  args: {
    where: nonNull('BatchWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.batch.delete({
      where,
      ...select,
    })
  },
})
