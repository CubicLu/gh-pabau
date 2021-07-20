import { mutationField, nonNull } from 'nexus'

export const BatchItemUpdateOneMutation = mutationField('updateOneBatchItem', {
  type: nonNull('BatchItem'),
  args: {
    where: nonNull('BatchItemWhereUniqueInput'),
    data: nonNull('BatchItemUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.batchItem.update({
      where,
      data,
      ...select,
    })
  },
})
