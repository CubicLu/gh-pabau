import { queryField, nonNull, list } from 'nexus'

export const BatchItemFindManyQuery = queryField('findManyBatchItem', {
  type: nonNull(list(nonNull('BatchItem'))),
  args: {
    where: 'BatchItemWhereInput',
    orderBy: list('BatchItemOrderByWithRelationInput'),
    cursor: 'BatchItemWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BatchItemScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.batchItem.findMany({
      ...args,
      ...select,
    })
  },
})
