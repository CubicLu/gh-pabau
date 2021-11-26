import { queryField, list } from 'nexus'

export const BatchItemFindFirstQuery = queryField('findFirstBatchItem', {
  type: 'BatchItem',
  args: {
    where: 'BatchItemWhereInput',
    orderBy: list('BatchItemOrderByWithRelationInput'),
    cursor: 'BatchItemWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BatchItemScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.batchItem.findFirst({
      ...args,
      ...select,
    })
  },
})
