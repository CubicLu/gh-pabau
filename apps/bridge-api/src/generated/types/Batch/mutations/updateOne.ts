import { mutationField, nonNull } from 'nexus'

export const BatchUpdateOneMutation = mutationField('updateOneBatch', {
  type: nonNull('Batch'),
  args: {
    where: nonNull('BatchWhereUniqueInput'),
    data: nonNull('BatchUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.batch.update({
      where,
      data,
      ...select,
    })
  },
})
