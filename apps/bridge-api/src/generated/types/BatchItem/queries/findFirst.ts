import { queryField, list } from 'nexus'

export const BatchItemFindFirstQuery = queryField('findFirstBatchItem', {
  type: 'BatchItem',
  args: {
    where: 'BatchItemWhereInput',
    orderBy: list('BatchItemOrderByInput'),
    cursor: 'BatchItemWhereUniqueInput',
    distinct: 'BatchItemScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.batchItem.findFirst({
      ...args,
      ...select,
    })
  },
})
