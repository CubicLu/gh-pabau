import { queryField, nonNull } from 'nexus'

export const BatchFindUniqueQuery = queryField('findUniqueBatch', {
  type: 'Batch',
  args: {
    where: nonNull('BatchWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.batch.findUnique({
      where,
      ...select,
    })
  },
})
