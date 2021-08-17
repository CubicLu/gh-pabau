import { queryField, nonNull, list } from 'nexus'

export const BatchItemFindCountQuery = queryField('findManyBatchItemCount', {
  type: nonNull('Int'),
  args: {
    where: 'BatchItemWhereInput',
    orderBy: list('BatchItemOrderByInput'),
    cursor: 'BatchItemWhereUniqueInput',
    distinct: 'BatchItemScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.batchItem.count(args as any)
  },
})
