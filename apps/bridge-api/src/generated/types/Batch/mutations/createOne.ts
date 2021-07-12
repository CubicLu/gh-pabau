import { mutationField, nonNull } from 'nexus'

export const BatchCreateOneMutation = mutationField('createOneBatch', {
  type: nonNull('Batch'),
  args: {
    data: nonNull('BatchCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.batch.create({
      data,
      ...select,
    })
  },
})
