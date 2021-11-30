import { mutationField, nonNull } from 'nexus'

export const BatchItemUpdateOneMutation = mutationField('updateOneBatchItem', {
  type: nonNull('BatchItem'),
  args: {
    data: nonNull('BatchItemUpdateInput'),
    where: nonNull('BatchItemWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.batchItem.update({
      where,
      data,
      ...select,
    })
  },
})
