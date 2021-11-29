import { mutationField, nonNull } from 'nexus'

export const BatchUpdateOneMutation = mutationField('updateOneBatch', {
  type: nonNull('Batch'),
  args: {
    data: nonNull('BatchUpdateInput'),
    where: nonNull('BatchWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.batch.update({
      where,
      data,
      ...select,
    })
  },
})
