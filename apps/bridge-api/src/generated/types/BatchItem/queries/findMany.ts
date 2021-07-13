import { queryField, nonNull, list } from 'nexus'

export const BatchItemFindManyQuery = queryField('findManyBatchItem', {
  type: nonNull(list(nonNull('BatchItem'))),
  args: {
    where: 'BatchItemWhereInput',
    orderBy: list('BatchItemOrderByInput'),
    cursor: 'BatchItemWhereUniqueInput',
    distinct: 'BatchItemScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.batchItem.findMany({
      ...args,
      ...select,
    })
  },
})
