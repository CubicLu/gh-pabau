import { queryField, nonNull } from 'nexus'

export const BatchItemFindUniqueQuery = queryField('findUniqueBatchItem', {
  type: 'BatchItem',
  args: {
    where: nonNull('BatchItemWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.batchItem.findUnique({
      where,
      ...select,
    })
  },
})
