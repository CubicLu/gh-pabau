import { mutationField, nonNull } from 'nexus'

export const BatchItemCreateOneMutation = mutationField('createOneBatchItem', {
  type: nonNull('BatchItem'),
  args: {
    data: nonNull('BatchItemCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.batchItem.create({
      data,
      ...select,
    })
  },
})
