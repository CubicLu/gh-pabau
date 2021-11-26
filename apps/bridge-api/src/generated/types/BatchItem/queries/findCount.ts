import { queryField, nonNull, list } from 'nexus'

export const BatchItemFindCountQuery = queryField('findManyBatchItemCount', {
  type: nonNull('Int'),
  args: {
    where: 'BatchItemWhereInput',
    orderBy: list('BatchItemOrderByWithRelationInput'),
    cursor: 'BatchItemWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BatchItemScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.batchItem.count(args as any)
  },
})
